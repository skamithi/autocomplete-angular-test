exports.config =
  # This is the port selenium opens by default
  seleniumAddress: 'http://localhost:4444/wd/hub'
  # Copied this from someone's file
  chromeOnly: true
  capabilities:
    'browserName': 'chrome'
  specs: ['../specs/js/*']
  framework: 'mocha'
  mochaOpts: {
    timeout: 30000
  }

