import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/kakitangan': {
                target: 'http://app.staging.kakitangan.com',
                changeOrigin: true,
                methods: ['POST', 'OPTIONS', 'GET'],
                rewrite: (path) => path.replace(/^\/kakitangan/, '')
            }
        }
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true
    }
});
