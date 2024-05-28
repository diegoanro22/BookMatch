'use server';
import connectToNeo4j from './connection';
import bcrypt from 'bcryptjs';

const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Convert secret to Uint8Array

async function signToken(data) {
    const alg = { name: 'HMAC', hash: 'SHA-256' };
    const key = await crypto.subtle.importKey('raw', secret, alg, false, ['sign']);
    const encoder = new TextEncoder();
    const header = encoder.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = encoder.encode(JSON.stringify(data));
    const base64Header = btoa(String.fromCharCode(...new Uint8Array(header)));
    const base64Payload = btoa(String.fromCharCode(...new Uint8Array(payload)));
    const dataToSign = `${base64Header}.${base64Payload}`;
    const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(dataToSign));
    const base64Signature = btoa(String.fromCharCode(...new Uint8Array(signature)));
    return `${dataToSign}.${base64Signature}`;
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

        const token = await signToken({ username: user.username });
        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function obtenerLibros() {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();

        const result = await session.run(
            'MATCH (b:Book) WITH b ORDER BY rand() LIMIT 50 RETURN b'
        );

        session.close();

        // Extrae las propiedades de cada nodo de libro
        const libros = result.records.map(record => record.get('b').properties);
        return libros;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener libros');
    }
}
export async function obtenerGeneros() {
        try {
        const connect = await connectToNeo4j();
        const session = connect.session();
    
        const result = await session.run(
            'MATCH (g:Genre) RETURN g'
        );
    
        session.close();
    
        // Extrae las propiedades de cada nodo de género
        const generos = result.records.map(record => record.get('g').properties);
    
        // Elimina los duplicados utilizando el método Set
        const generosSinDuplicados = [...new Set(generos.map(genero => genero.nombre))];
    
        return generosSinDuplicados;
        } catch (error) {
        console.log(error);
        throw new Error('Error al obtener géneros');
        }
    }