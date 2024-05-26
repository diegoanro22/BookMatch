import Image from "next/image";
import Link from "next/link";
import connectToNeo4j from "../lib/connection";

export default async function Home() {
  try {
    const connect = await connectToNeo4j();
  } catch (error) {
    console.log(error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-5">
      <div className="relative isolate px-6 pt-5 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          ></div>
        </div>
        <div className="mx-auto max-w-2xl py-2 sm:py-20 lg:py-28"> {/* Cambio en esta línea */}
          <div className="text-center">
            <div className="w-80 h-80 mx-auto">
              <Image src="/lalala.png" alt="BookMatch Image" width={500} height={500} />
            </div>
            <p className="text-lg leading-8 text-gray-600 mt-0 mb-0 text-white">
              Book Match es tu destino literario personalizado, donde las recomendaciones de libros cobran vida. Descubre lecturas que se alinean perfectamente con tus gustos y sumérgete en una experiencia de descubrimiento literario única y enriquecedora.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/login/login_user"
                className="rounded-md bg-yellow-500 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                /* Cambios aquí para el color del botón y del texto */
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          ></div>
        </div>
      </div>
    </main>
  );
}
