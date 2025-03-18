import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/kakitangan': {
                target: 'https://app.staging.kakitangan.com',
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
