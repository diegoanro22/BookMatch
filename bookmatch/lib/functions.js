'use server'
import connectToNeo4j from "@/lib/connection"


export async function createUser() {
    try {
        const connect = await connectToNeo4j();
        const session = connect.session();
        const hola = "hola";
        const result = await session.run(

            'CREATE (u: Genre {type: $hola } ) RETURN u',{hola});
        
        session.close();
        return result.records[0]?.get('u').properties; 

    } catch (error) {
        console.log(error)
    }
}