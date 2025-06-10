import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://your-app-url.com', // Set your base URL here
    viewportWidth: 1920, // Default viewport width
    viewportHeight: 1080 , // Default viewport height
    video: true, // Enable video recording during tests
    screenshotOnRunFailure: true, // Take screenshots on test failure
    videosFolder: 'cypress/videos', // Folder where video recordings are saved
    screenshotsFolder: 'cypress/screenshots', // Folder where screenshots are saved
    trashAssetsBeforeRuns: true, // Clean up old videos/screenshots before each run
    setupNodeEvents(on, config) {
      // Here you can define custom event listeners, plugins, or modify config values
      // Example: Modify the base URL during certain conditions
      if (config.env.stage === 'staging') {
        config.baseUrl = 'https://staging-url.com';
      }
      return config;
    },
  },
});
