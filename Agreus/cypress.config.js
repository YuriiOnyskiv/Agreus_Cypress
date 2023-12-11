const { defineConfig } = require('cypress') 

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  env:{
    apiUrl: "https://agreus.tech",
    userName: "yurii.onyskiv@inventia.pl",
    password: "Test123!"
  },
  e2e: {
    baseUrl: 'https://agreus.tech/',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*']
  },
  retries:{
    runMode: 1,
    openMode: 1
  }
})
