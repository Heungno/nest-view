import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: 'http://heung.win:3000',

    build: {
        outDir: '../dist/frontend',
    },
    server: {
        host: '0.0.0.0',
        port: 3001,
        strictPort: true,
        proxy: {
            '^/api': {
                target: 'http://heung.win:3000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
});
