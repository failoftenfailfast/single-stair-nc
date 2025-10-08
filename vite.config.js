import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    'import.meta.env.VITE_SANITY_PROJECT_ID': JSON.stringify(process.env.SANITY_PROJECT_ID || 'n8639pbu'),
    'import.meta.env.VITE_SANITY_DATASET': JSON.stringify(process.env.SANITY_DATASET || 'production'),
    'import.meta.env.VITE_SANITY_API_VERSION': JSON.stringify(process.env.SANITY_API_VERSION || '2024-03-01'),
  },
  server: {
    port: 3333,
  },
})
