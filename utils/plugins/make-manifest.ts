import * as fs from 'fs'
import { resolve } from 'path'
import { PluginOption } from 'vite'
import chalk from 'chalk'

type Manifest = chrome.runtime.ManifestV3

function convertManifestToString(manifest: Manifest): string {
  return JSON.stringify(manifest, null, 2)
}

const outDir = resolve(__dirname, '..', '..', 'public')

function makeManifest(manifest: Manifest): PluginOption {
  return {
    name: 'make-manifest',
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir)
      }

      const manifestPath = resolve(outDir, 'manifest.json')

      fs.writeFileSync(manifestPath, convertManifestToString(manifest))

      console.log(
        chalk.white.bgGreen.bold(
          `\nManifest file copy complete: ${manifestPath} success`
        )
      )
    },
  }
}

export default makeManifest
export { makeManifest, convertManifestToString }
