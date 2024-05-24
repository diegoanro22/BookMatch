import { inter } from '../../fonts/font.ts';
import Image from "next/image";
import Link from "next/link";
import '../../css/globals.css';

export default function LoginLayout({ children }) {
return (
<html lang="en" class="h-full bg-white">
    <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>BookMatch</title>
    </head>
    <body className={inter.className} class="h-full">
    <div class="bg-white">
    <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8 " aria-label="Global" >
        <div class="flex lg:flex-1">
            <span class="sr-only">hola</span>
            <Image class="h-11 w-auto" 
            src="/bookmatch.png" 
            alt=""
            width={500}
            height={500}
            />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <Link href="/login" className="text-sm font-semibold leading-6 text-gray-900">
            Log dfs <span aria-hidden="true">&rarr;</span>
        </Link>
        </div>
    </nav>
    
    </header>
    </div>

    <main>{children}</main>
    </body>
</html>
);
}
