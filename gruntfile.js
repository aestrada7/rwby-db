module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  
  grunt.initConfig({
    watch: {
      css: {
        files: ['app/features/**/*.scss', 'app/styles/*.scss', 'app/styles/components/*.scss', 'app/components/**/**/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false
        }
      }
    },

    sass: {
      build: {
        files: [
          {
            expand: true,
            cwd: 'app',
            src: ['features/**/*.scss', 'styles/*.scss'],
            ext: '.css',
            dest: 'app/build'
          }
        ]
      }
    },

    clean: {
      bower: ['bower_components'],
      vendor: ['app/vendor'],
      develop: ['app/build']
    },

    bower: {
      install: {
        options: {
          targetDir: './app/vendor',
          cleanTargetDir: true,
          layout: 'byComponent'
        }
      }
    },

    parallel: {
      watchers: {
        tasks: [{
          grunt: true,
          args: ['http-server']
        }, {
          stream: true,
          args: ['watch']
        }]
      }
    },

    'http-server': {
      'dev': {
        root: 'app/',
        port: 84,
        host: '127.0.0.1',
        runInBackground: false,
        logFn: function(req, res, error) { },
      }
    }
  });

  grunt.registerTask('clean-instance', ['clean:bower', 'clean:vendor', 'clean:develop']);
  grunt.registerTask('update', ['clean-instance', 'bower']);
  grunt.registerTask('develop', ['sass', 'parallel:watchers']);
};