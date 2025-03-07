import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(function middleware(req: NextRequest) {
    return NextResponse.next();
}, {
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        newUser: "/auth/setup",
    },
}
);

export const config = {
    matcher: [
        "/((?!auth|_next/static|_next/image|favicon.ico|assets).*)"
    ],
};
