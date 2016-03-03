module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    protractor:
      options:
        configFile: 'protractor/conf.js'
        keepAlive: true
        noColor: false
        args: {}
      all:{}
    coffee:
      compile_specific:
        files:
          'protractor/conf.js': 'protractor/conf.coffee'
      compile_glob:
        expand: true
        flatten: true
        cwd: 'specs/coffee'
        src: ['*.coffee']
        dest: 'specs/js'
        ext: '.js'

  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-protractor-runner')
  grunt.registerTask('e2e', ['coffee:compile_glob', 'coffee:compile_specific', 'protractor:all' ])
