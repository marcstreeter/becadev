// references:
//   https://nextjs.org/docs/pages/building-your-application/routing/middleware#example
//   https://github.com/vercel/next.js/issues/5602#issuecomment-986915749
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest): NextResponse | null {
    if (req.nextUrl.href.includes('/media/_next/')){
        return NextResponse.rewrite(
            req.nextUrl.href.replace('/media/_next/', '/waffle/'),
        );
    }
    return null;
}