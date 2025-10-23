import { defineConfig } from 'vite';

export default defineConfig({
  // **THIS IS THE CRITICAL FIX:** // Sets the base public path when served in production.
  // Using '/' or './' should fix asset loading issues on Vercel.
  base: '/', 
  
  build: {
    outDir: 'dist', // Must match the 'distDir' in vercel.json
    // other build options...
  },
  // other configs...
});
