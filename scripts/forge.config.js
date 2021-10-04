module.exports = {
  packagerConfig: {
    asar: true
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: 'news_speaker_app'
      }
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'luisdiasdev',
          name: 'news-speaker-app'
        },
        draft: true,
        prerelease: true,
      }
    }
  ],
  plugins: [
    [
      '@electron-forge/plugin-webpack',
      {
        mainConfig: './scripts/webpack.main.config.js',
        renderer: {
          config: './scripts/webpack.renderer.config.js',
          entryPoints: [
            {
              html: './public/index.html',
              js: './src/renderer/index.tsx',
              name: 'main_window'
            }
          ]
        },
        port: 9998,
        loggerPort: 9997
      }
    ],
    [
      '@electron-forge/plugin-electronegativity',
      {
        isSarif: true
      }
    ],
    ['@electron-forge/plugin-auto-unpack-natives']
  ]
}
