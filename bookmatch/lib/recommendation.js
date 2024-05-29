'use server';
import connectToNeo4j from './connection';
import jwt from 'jsonwebtoken';

export async function obtenerLibrosPorAutor(username) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (u:User {username: $username})-[:LIKES]->(b:Book)<-[:WROTE]-(a:Author) ' +
            'MATCH (a)-[:WROTE]->(recomm:Book) ' +
            'RETURN DISTINCT recomm.title AS title, recomm.image AS image ' +
            'ORDER BY rand() ' +
            'LIMIT 5',
            { username }
        );

        session.close();

        const librosPorAutor = result.records.map(record => ({
            title: record.get('title'),
            image: record.get('image')
        }));
        return librosPorAutor;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener libros por autor');
    }
}

export async function obtenerLibrosPorGenero(username) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (u:User {username: $username})-[:INTERESTED_IN]->(g:Genre)<-[:BELONGS_TO]-(b:Book) ' +
            'RETURN DISTINCT b.title AS title, b.image AS image ' +
            'ORDER BY rand() ' +
            'LIMIT 5',
            { username }
        );

        session.close();

        const librosPorGenero = result.records.map(record => ({
            title: record.get('title'),
            image: record.get('image')
        }));
        return librosPorGenero;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener libros por género');
    }
}

async function fetchUserGraphByLikedBooks(username) {
    const connect = await connectToNeo4j();
    const session = connect.session();

    const result = await session.run(
        'MATCH (u:User {username: $username})-[:LIKES]->(b:Book)-[:BELONGS_TO]->(g:Genre) ' +
        'MATCH (g)<-[:BELONGS_TO]-(rec:Book) ' +
        'WHERE NOT (u)-[:LIKES]->(rec) ' +
        'RETURN u, collect(distinct g) as genres, collect(distinct rec) as recommendedBooks',
        { username }
    );

    session.close();

    if (result.records.length === 0) {
        throw new Error('No se encontraron datos para el usuario');
    }

    const graphData = result.records.map(record => ({
        user: record.get('u'),
        genres: record.get('genres'),
        recommendedBooks: record.get('recommendedBooks')
    }))[0];

    return graphData;
}

function bfs(graph, startNode) {
    const queue = [startNode];
    const visited = new Set();
    const recommendations = [];

    while (queue.length > 0) {
        const node = queue.shift();

        if (!visited.has(node.identity)) {
            visited.add(node.identity);

            if (node.labels.includes('Book') && !recommendations.some(r => r.identity === node.identity)) {
                recommendations.push(node);
            }

            const neighbors = graph[node.identity] || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor.identity)) {
                    queue.push(neighbor);
                }
            }
        }
    }

    return recommendations;
}

export async function recomendarLibrosBFS(username) {
    try {
        const graphData = await fetchUserGraphByLikedBooks(username);

        console.log('Datos del grafo:', JSON.stringify(graphData, null, 2));

        const graph = {};

        // Inicializamos los nodos del grafo
        graphData.genres.forEach(genre => {
            graph[genre.identity] = [];
        });

        graphData.recommendedBooks.forEach(book => {
            graph[book.identity] = [];
        });

        // Conectamos los nodos de géneros y libros recomendados
        graphData.genres.forEach(genre => {
            graphData.recommendedBooks.forEach(book => {
                if (!graph[genre.identity]) graph[genre.identity] = [];
                if (!graph[book.identity]) graph[book.identity] = [];
                graph[genre.identity].push(book);
                graph[book.identity].push(genre);
            });
        });

        const userNode = graphData.user;

        // Verificamos si el nodo del usuario existe en el grafo
        if (!userNode) {
            throw new Error('Nodo de usuario no encontrado en el grafo');
        }

        const recommendations = bfs(graph, userNode).slice(0, 5);

        console.log('Recomendaciones:', JSON.stringify(recommendations, null, 2));

        const librosRecomendados = recommendations.map(record => ({
            title: record.properties.title,
            image: record.properties.image
        }));

        return librosRecomendados;
    } catch (error) {
        console.error('Error en recomendarLibrosBFS:', error);
        throw new Error('Error al recomendar libros utilizando BFS');
    }
}
