Cash variant:
ctx.res.setHeader(
'Cache-Control',
'public, s-maxage=120, max-age=120, stale-while-revalidate=59',
);
