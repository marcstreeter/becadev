/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'docs', // this is the directory I wish to use for github pages and where I store CNAME
    output: 'export', // this allows for static sites like those used by github pages
};

export default nextConfig;
