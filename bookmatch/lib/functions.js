'use server';
import connectToNeo4j from './connection';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

function signToken(data) {
    return jwt.sign(data, secret, { algorithm: 'HS256' });
}

export async function createUser({ nombre, apellido, email, username, password }) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'CREATE (u:User {nombre: $nombre, apellido: $apellido, email: $email, username: $username, password: $password}) RETURN u',
            { nombre, apellido, email, username, password }
        );

        session.close();
        return result.records[0]?.get('u').properties;
    } catch (error) {
        console.log(error);
        throw new Error('Error creating user');
    }
}

export async function loginUser(formData) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (u:User {username: $username}) RETURN u',
            { username: formData.username }
        );

        if (result.records.length === 0) {
            throw new Error('Usuario no encontrado');
        }

        const user = result.records[0].get('u').properties;
        const isMatch = await bcrypt.compare(formData.password, user.password);

        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        session.close();

        const token = signToken({username: user.username });
        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function obtenerLibros(username) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (b:Book) ' +
            'OPTIONAL MATCH (u:User {username: $username})-[r1:READ]->(b) ' +
            'OPTIONAL MATCH (u:User {username: $username})-[r2:LIKES]->(b) ' +
            'RETURN DISTINCT b.title AS title, b.image AS image, r1 IS NOT NULL AS isRead, r2 IS NOT NULL AS isLiked ' +
            'ORDER BY rand() ' +
            'LIMIT 50',
            { username }
        );

        session.close();

        const libros = result.records.map(record => ({
            title: record.get('title'),
            image: record.get('image'),
            isRead: record.get('isRead'),
            isLiked: record.get('isLiked')
        }));
        return libros;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener libros');
    }
}

export async function obtenerGeneros(username) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (g:Genre) ' +
            'OPTIONAL MATCH (u:User {username: $username})-[r:INTERESTED_IN]->(g) ' +
            'RETURN DISTINCT g.type AS type, r IS NOT NULL AS isLiked',
            { username }
        );

        session.close();

        const generos = result.records.map(record => ({
            type: record.get('type'),
            isLiked: record.get('isLiked')
        }));
        return generos;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener generos');
    }
}


export async function relacionGenero(userUsername, generoType) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (u:User {username: $userUsername}), (g:Genre {type: $generoType}) ' +
            'MERGE (u)-[r:INTERESTED_IN]->(g) ' +
            'RETURN r',
            { userUsername, generoType }
        );

        session.close();

        if (result.records.length > 0) {
            console.log('Relación creada con éxito:', result.records[0].get('r'));
            return true;
        } else {
            throw new Error('No se pudo crear la relación');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al crear la relación entre el usuario y el género');
    }
}

export async function obtenerUserIdDesdeToken(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded.username;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
    }
}

export async function eliminarRelacionGenero(userUsername, generoType) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (u:User {username: $userUsername})-[r:INTERESTED_IN]->(g:Genre {type: $generoType}) ' +
            'DELETE r',
            { userUsername, generoType }
        );

        session.close();

        if (result.summary.counters.updates().relationshipsDeleted > 0) {
            console.log('Relación eliminada con éxito');
            return true;
        } else {
            throw new Error('No se pudo eliminar la relación');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al eliminar la relación entre el usuario y el género');
    }
}

export async function relacionLikeLibro(userUsername, libroTitle) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (u:User {username: $userUsername}), (b:Book {title: $libroTitle}) ' +
            'MERGE (u)-[r:LIKES]->(b) ' +
            'RETURN r',
            { userUsername, libroTitle }
        );

        session.close();

        if (result.records.length > 0) {
            console.log('Relación de gusto creada con éxito:', result.records[0].get('r'));
            return true;
        } else {
            throw new Error('No se pudo crear la relación de gusto');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al crear la relación de gusto entre el usuario y el libro');
    }
}

export async function eliminarRelacionLikeLibro(userUsername, libroTitle) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (u:User {username: $userUsername})-[r:LIKES]->(b:Book {title: $libroTitle}) ' +
            'DELETE r',
            { userUsername, libroTitle }
        );

        session.close();

        if (result.summary.counters.updates().relationshipsDeleted > 0) {
            console.log('Relación de gusto eliminada con éxito');
            return true;
        } else {
            throw new Error('No se pudo eliminar la relación de gusto');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al eliminar la relación de gusto entre el usuario y el libro');
    }
}


export async function relacionReadLibro(userUsername, libroTitle) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (u:User {username: $userUsername}), (b:Book {title: $libroTitle}) ' +
            'MERGE (u)-[r:READ]->(b) ' +
            'RETURN r',
            { userUsername, libroTitle }
        );

        session.close();

        if (result.records.length > 0) {
            console.log('Relación de leído creada con éxito:', result.records[0].get('r'));
            return true;
        } else {
            throw new Error('No se pudo crear la relación de leído');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al crear la relación de leído entre el usuario y el libro');
    }
}

export async function eliminarRelacionReadLibro(userUsername, libroTitle) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (u:User {username: $userUsername})-[r:READ]->(b:Book {title: $libroTitle}) ' +
            'DELETE r',
            { userUsername, libroTitle }
        );

        session.close();

        if (result.summary.counters.updates().relationshipsDeleted > 0) {
            console.log('Relación de leído eliminada con éxito');
            return true;
        } else {
            throw new Error('No se pudo eliminar la relación de leído');
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error al eliminar la relación de leído entre el usuario y el libro');
    }
}


export async function obtenerLibrosLeidos(username) {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (u:User {username: $username})-[r:READ]->(b:Book) ' +
            'OPTIONAL MATCH (u)-[l:LIKES]->(b) ' +
            'RETURN DISTINCT b.title AS title, b.image AS image, r IS NOT NULL AS isRead, l IS NOT NULL AS isLiked',
            { username }
        );

        session.close();

        const librosLeidos = result.records.map(record => ({
            title: record.get('title'),
            image: record.get('image'),
            isRead: record.get('isRead'),
            isLiked: record.get('isLiked')
        }));
        return librosLeidos;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener libros leídos');
    }
}

