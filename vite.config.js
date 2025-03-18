import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://your-api-server.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/kakitangan': {
                target: 'http://your-api-server.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/kakitangan/, '')
            }
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true
    }
});
