/*
 * grunt-Litchi
 * https://github.com/chiu/Litchi
 *
 * Copyright (c) 2014 chiu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    Litchi: {
      dist: {
        files: {
          'tmp/inquiry.js': 'test/inquiry.html',
          'tmp/login.js': 'test/login.html',
          'tmp/signup.js': 'test/signup.html',
          'tmp/topbar.js': 'test/topbar.html'
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['clean', 'Litchi:dist']);

};
