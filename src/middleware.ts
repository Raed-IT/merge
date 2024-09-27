import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/create-password', '/forgot-password', '/register', "/create-new-password", "/confirm-password", "/reset-password"]

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isProtectedRoute = !(publicRoutes.includes(path))
    const authCookie = request.cookies.get("auth-store")?.value
    const isAuthenticated = authCookie
        ? JSON.parse(authCookie).state.isAuthenticated && request.cookies.has("Core-Base")
        : false

    if (isProtectedRoute && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    if (isProtectedRoute && isAuthenticated && !request.cookies.has("Core-Org")&& path !="/organizations") {
        return NextResponse.redirect(new URL('/organizations', request.nextUrl))
    }
    if (!isProtectedRoute && isAuthenticated) {
        return NextResponse.redirect(new URL('/apps', request.nextUrl))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}