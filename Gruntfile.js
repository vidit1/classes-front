module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                options: {
                    beautify: false,
                    mangle: false,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'dist/scripts/controllers.min.js': [
                        'scripts/config.js',
                        'scripts/app.js',
                        "scripts/services/*.js",
                        'scripts/controller/*.js'
                    ]
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'dist/css/style.min.css': [
                        'css/app.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/html/login.html': 'html/login.html'
                }
            }
        },
        targethtml: {
            dev: {
                files: {
                    'index.html': 'grunt_index.html'
                }
            },
            prod: {
                files: {
                    'index.html': 'grunt_index.html'
                }
            }
        },
        cacheBust: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 16,
                assets: ['dist/scripts/*.js']
            },
            assets: {
                files: [{
                    src: ['index.html']
                }]
            }
        },
        clean : {
            clearAll:{
                src : [ "scripts/*.*.js",
                    "scripts/controller/*.*.js",
                    "css/*.*js",
                    "dist/scripts/*",
                    "dist/css/*"
                ]

            }},
        'language_in': 'ECMASCRIPT6'

    });
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-targethtml');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('dev', ['targethtml:dev']);
    grunt.registerTask('prod', ['clean:clearAll','htmlmin', 'cssmin', 'uglify','targethtml:prod','cacheBust']);

    grunt.registerTask('clearAll',['clean:clearAll']);
};
