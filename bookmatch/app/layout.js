'use client'

import { inter } from '../fonts/font.ts';
import Image from "next/image";
import Link from "next/link";
import '../css/globals.css';
import {useRouter} from 'next/navigation';


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
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8 " aria-label="Global" >
          <div className="flex lg:flex-1">
              <span className="sr-only">BookMatch</span>
              <Image className="h-11 w-auto" 
              src="/bookmatch.png" 
              alt=""
              width={500}
              height={500}
              />
          </div>
        </nav>
        
      </header>
      </div>

        {children}
      </body>
    </html>
  );
}
