import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/kakitangan': {
                target: 'http://app.staging.kakitangan.com',
                changeOrigin: true,
                methods: ['POST', 'OPTIONS', 'GET'],
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                },
                rewrite: (path) => path.replace(/^\/kakitangan/, '')
            }
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true
    }
});
