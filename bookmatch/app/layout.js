'use client'

import { inter } from '../fonts/font.ts';
import Image from "next/image";
import '../css/globals.css';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = router.pathname;
  console.log(pathname);
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BookMatch</title>
      </head>
      <body className={`bg-cover bg-center ${inter.className}`}>
        <header className="absolute inset-x-0 top-0 z-50 bg-gray-700 text-white p-6 shadow-md">
            <nav className="flex items-center justify-between lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <h1 className="font-Lobster text-4xl text-yellow-500 font-bold">Book Match</h1>
              </div>
            </nav>
          </header>

        {children}
        
         {/* Footer */}
        <footer className="bg-gray-700 text-white p-8 mt-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between">
              {/* Logo y Redes Sociales */}
              <div className="flex flex-col">
                <div className="mb-4">
                <h1 style={{
                    fontWeight: 'bold', 
                    color: 'white', 
                    fontSize: '24px', 
                    marginBottom: '10px', 
                    textShadow: '2px 2px 4px rgba(0,0,0,0.6)', 
                    padding: '10px', 
                    borderBottom: '2px solid #fff', 
                    width: 'max-content'
                  }}>Book Match</h1>
                  <p className="text-sm">por el placer de leer</p>
                </div>
                <div className="flex space-x-4">
                  <Image
                    src="/facebook1-logo.png"
                    alt="Facebook Logo"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/X-logo.png"
                    alt="Twitter Logo"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/github-logo.png"
                    alt="Github Logo"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/instagram-logo1.png"
                    alt="Instagram Logo"
                    width={24}
                    height={24}
                  />
                  <Image
                    src="/rss-logo1.png"
                    alt="RSS Logo"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              {/* Información de Contacto */}
              <div className="flex flex-col">
                <h2 className="text-lg font-bold mb-2">CONTACTO</h2>
                <p className="text-sm mb-1">📞 +502 8374 1923</p>
                <p className="text-sm mb-1">✉️ infomatch@gmail.com</p>
                <p className="text-sm mb-1">💬 Formulario de contacto</p>
              </div>
              {/* Páginas Legales */}
              <div className="flex flex-col">
                <h2 className="text-lg font-bold mb-2">PÁGINAS LEGALES</h2>
                <p className="text-sm mb-1">Aviso legal</p>
                <p className="text-sm mb-1">Política de Cookies</p>
                <p className="text-sm mb-1">Condiciones de servicio</p>
                <p className="text-sm mb-1">Protección de datos</p>
              </div>
              {/* Atención al Cliente */}
              <div className="flex flex-col">
                <h2 className="text-lg font-bold mb-2">ATENCIÓN AL CLIENTE</h2>
                <p className="text-sm mb-1">Contacto</p>
                <p className="text-sm mb-1">Quiénes somos</p>
              </div>
            </div>
            <div className="border-t border-gray-600 mt-4 pt-4 text-center">
              <p className="text-sm">2024 © Boock Match. Todos los Derechos Reservados</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
