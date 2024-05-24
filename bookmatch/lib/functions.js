'use server'
import connectToNeo4j from "./connection"
import bcrypt from 'bcryptjs';


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


        return { message: 'Inicio de sesión exitoso' };
    } catch (error) {
        console.log(error);
        throw error;
    }
}