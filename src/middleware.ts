export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/project',
    '/project/:path*',
    '/mytasks',
    '/mytasks/:path*',
    '/account',
    '/account/:path*',
  ],
};
