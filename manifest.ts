import packageJson from './package.json'

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: 'Brdr.ly - Create Fancy CSS Shapes',
  version: packageJson.version,
  description: packageJson.description,
  action: {
    default_title: '',
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icons/icon-256.png',
  },
  icons: {
    '64': 'icons/icon-64.png',
    '128': 'icons/icon-128.png',
    '256': 'icons/icon-256.png',
  },
  web_accessible_resources: [
    {
      resources: [
        'assets/js/*.js',
        'assets/css/*.css',
        'icons/icon-64.png',
        'icons/icon-128.png',
        'icons/icon-256.png',
      ],
      matches: ['*://*/*'],
    },
  ],
}

export default manifest
