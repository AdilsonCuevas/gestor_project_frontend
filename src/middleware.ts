import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken');

    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const payload = JSON.parse(atob(accessToken.value.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);

        if (payload.exp && payload.exp < now) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};


