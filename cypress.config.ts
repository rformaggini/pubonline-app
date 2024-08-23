import { defineConfig } from 'cypress'

export default defineConfig({
  
  video: true,
  screenshotOnRunFailure: true,
  e2e: {
    'baseUrl': 'http://localhost:4200',
    experimentalRunAllSpecs: true
  },
  
  
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }
  
})