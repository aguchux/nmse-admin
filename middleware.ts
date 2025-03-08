import { auth as middleware } from '@/auth';

export default middleware;

export const config = {
    matcher: [
        "/((?!auth|_next/static|_next/image|favicon.ico|assets).*)"
    ],
    pages: {
        "*": {
            protected: true,
            except: ["/auth"]
        }
    }
};
