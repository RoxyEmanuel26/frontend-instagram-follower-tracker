import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
    "/verify-email-sent",
    "/privacy-policy",
    "/terms-of-service",
    "/faq",
];

const authPaths = ["/login", "/register", "/forgot-password", "/reset-password"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip API routes and static files
    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return NextResponse.next();
    }

    // Security headers
    const response = NextResponse.next();
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
        "Permissions-Policy",
        "camera=(), microphone=(), geolocation=()"
    );

    return response;
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
