module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        uglify: {
            vendors: {
                files: {
                    'JS/dist/app.min.js': ['JS/dist/app.js']
                }
            }
        },

        concat: {
            options: {
                seperator: ';'
            },
            dist: {
                src: ['JS/dev/**/*.js'],
                dest: 'JS/dist/app.js'
            }
        }

    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['dev']);
    grunt.registerTask('dev', ['concat']);
    grunt.registerTask('prod', ['uglify:vendors']);
    grunt.registerTask('test', ['concat', 'uglify:vendors']);

};