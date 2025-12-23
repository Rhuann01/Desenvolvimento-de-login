import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const publicRoutes = ["/register", "/login", "/"];

  const isPublic = publicRoutes.includes(path);

  if (isPublic) {
    return NextResponse.next();
  }

  // Pega rato

  const token = req.cookies.get("tokens")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/((?:(?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|svg|webp)$).)*)",
  ],
};
