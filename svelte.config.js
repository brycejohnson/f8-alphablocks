import adapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html',
      precompress: false
    }),
    paths: {
      // Empty base for native app builds (Capacitor), '/alphablocks' for web deploy
      base: process.env.NATIVE_BUILD ? '' : '/alphablocks'
    }
  }
}

export default config
