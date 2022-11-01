import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, parse } from 'path'

import makeManifest from './utils/plugins/make-manifest'
import manifest from './manifest'

const root = resolve(__dirname, 'src')
const assetsDir = resolve(root, 'assets')
const iconsDir = resolve(root, 'icons')
const pagesDir = resolve(root, 'pages')
const stylesDir = resolve(root, 'styles')
const outDir = resolve(__dirname, 'dist')
const publicDir = resolve(__dirname, 'public')

const isDev = process.env.__DEV__ === 'true'

export default defineConfig({
  resolve: {
    alias: {
      '@src': root,
      '@assets': assetsDir,
      '@icons': iconsDir,
      '@pages': pagesDir,
      '@styles': stylesDir,
    },
  },
  plugins: [react(), isDev ? null : makeManifest(manifest)],
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    rollupOptions: {
      input: {
        popup: resolve(pagesDir, 'popup', 'index.html'),
      },
      output: {
        entryFileNames: 'src/pages/[name]/index.js',
        chunkFileNames: isDev ? 'assets/js/[name].js' : 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const { dir, name: _name } = parse(assetInfo.name!)
          const assetFolder = getLastElement(dir.split('/'))
          const name = assetFolder + firstUpperCase(_name)
          return `assets/[ext]/${name}.chunk.[ext]`
        },
      },
    },
  },
})

function getLastElement<T>(array: ArrayLike<T>): T {
  const length = array.length
  const lastIndex = length - 1
  return array[lastIndex]
}

function firstUpperCase(str: string) {
  const firstAlphabet = new RegExp(/( |^)[a-z]/, 'g')
  return str.toLowerCase().replace(firstAlphabet, (L) => L.toUpperCase())
}
