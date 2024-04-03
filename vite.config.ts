import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import viteTsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
    plugins: [
        react(),
        viteTsconfigPaths(),
    ],
    server: {
        port: 3000
    },
    build: {
        outDir: 'build',
        minify: 'esbuild',
    },
    esbuild: {
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@controllers': path.resolve(__dirname, './src/controllers'),
            '@interfaces': path.resolve(__dirname, './src/interfaces'),
            '@services': path.resolve(__dirname, './src/services'),
        },
    }
});
