'use client'

import { inter } from '../fonts/font.ts';
import Image from "next/image";
import Link from "next/link";
import '../css/globals.css';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const router = useRouter()
  const pathname = router.pathname;
  // Use the pathname as needed
  console.log(pathname);
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BookMatch</title>
      </head>
      <body className={inter.className}>
        <div className="bg-white">
          <header className="absolute inset-x-0 top-0 z-50 bg-white">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
              <div className="flex lg:flex-1">
                <span className="sr-only">BookMatch</span>
                <h1 className="font-woodland text-2xl text-black">Book Match</h1>
              </div>
            </nav>
          </header>
        </div>

        {children}
        {/* Footer */}
        <footer className="bg-gray-200 bg-opacity-100 text-left p-4">
          <div className="flex justify-between items-center">
            {/* Información de la Universidad */}
            <div className="ml-8">
              <br></br>
              <p className="text-sm text-gray-800 mb-5">©Universidad del Valle de Guatemala</p>
              <p className="text-sm text-gray-800 mb-5">Contacto</p>
              <p className="text-sm text-gray-800 mb-5">Tel: +502 8293 2673</p>
              <p className="text-sm text-gray-800 mb-5">info@uvg.edu.gt</p>
            </div>
            {/* Redes Sociales */}
            <div className="flex items-center mr-12">
              {/* Logo de Instagram */}
              <div className="flex items-center mr-12">
                <Image
                  src="/instagram-logo.png"
                  alt="Instagram Logo"
                  width={55}
                  height={55}
                  className="mr-2"
                />
                <p className="text-sm text-gray-800">Instagram</p>
              </div>
              {/* Logo de GitHub */}
              <div className="flex items-center">
                <Image
                  src="/github-logo.png"
                  alt="GitHub Logo"
                  width={55}
                  height={55}
                  className="mr-2"
                />
                <p className="text-sm text-gray-800">GitHub</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
