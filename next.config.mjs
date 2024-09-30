/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'docs', // this is the directory I wish to use for github pages and where I store CNAME
    output: 'export', // this allows for static sites like those used by github pages
    images: {
        unoptimized: true, // need this so that images are output, by default Image attempt to optimize server side
    },
    // the whole point of the assetPrefix was to remove "_next", it does not remove it
    // solutions from this thread point to middleware which is server side only https://github.com/vercel/next.js/issues/5602
    // instead using a .nojekyll file per https://github.blog/news-insights/the-library/bypassing-jekyll-on-github-pages/
    //assetPrefix: '/media', 
};

export default nextConfig;
