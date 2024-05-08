import Image from "next/image"
import Link from "next/link"
import connectToNeo4j from "@/lib/connection"
import {createUser} from "@/lib/funcitons"

const page = async () => {
    console.log("ddh")

        const prueba = await createUser();
        console.log(prueba);

  return (
    <div>
      <h1 className="text-white">Hola</h1>
    </div>
  )


}


export default page

