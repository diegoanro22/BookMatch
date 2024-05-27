import { NextResponse } from 'next/server';

const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Convert secret to Uint8Array

async function verifyToken(token) {
    const alg = { name: 'HMAC', hash: 'SHA-256' };
    const key = await crypto.subtle.importKey('raw', secret, alg, false, ['verify']);
    const [header, payload, signature] = token.split('.').map(part => new Uint8Array(atob(part).split("").map(c => c.charCodeAt(0))));
    const data = `${token.split('.')[0]}.${token.split('.')[1]}`;
    const valid = await crypto.subtle.verify('HMAC', key, signature, new TextEncoder().encode(data));
    return valid;
}

export async function middleware(request) {
    const token = request.cookies.get('authToken')?.value;

    if (!token) {
        console.log("Token not found");
        return NextResponse.redirect(new URL('/login/login_user', request.url));
    }

    try {
        const isValid = await verifyToken(token);
        if (isValid) {
            return NextResponse.next();
        } else {
            throw new Error('Invalid token');
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        return NextResponse.redirect(new URL('/login/login_user', request.url));
    }
}

export const config = {
    matcher: ['/main/:path*'], // Protect all paths under /main
};
