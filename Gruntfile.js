module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      css: {
        src: [
          'src/css/*.css'
        ],
        dest: 'compiled/style.css',
      },
      js: {
        src: [     
          'src/js/*.js',
        ],
        dest: 'compiled/bassjs.js',
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'compiled/bassjs.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['<%= concat.js.src %>'],
        tasks: ['concat'],
      },
      css: {
        files: ['<%= concat.css.src %>'],
        tasks: ['concat'],
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'watch']);
};