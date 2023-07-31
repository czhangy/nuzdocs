/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    images: {
        domains: ["raw.githubusercontent.com", "www.serebii.net", "play.pokemonshowdown.com"],
    },
};

module.exports = nextConfig;
