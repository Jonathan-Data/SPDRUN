import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'

export async function middleware(request: Request) {
    // @ts-ignore
    const session = await auth();
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/upload', '/profile'], // Protect these routes
};