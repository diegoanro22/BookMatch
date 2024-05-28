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