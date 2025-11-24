import { defineConfig } from 'vitest/config'; // Or 'vitest' if you prefer type safety
import { fileURLToPath } from 'node:url';

export default defineConfig({
    test: {
        globals: true, // Optional: makes global functions like describe, it, expect available
        environment: 'jsdom', // Or 'happy-dom' for better performance
        setupFiles: ['./src/setup-vitest.ts'], // Path to your setup file
    },
    resolve: {
        alias: {
            '@src': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
