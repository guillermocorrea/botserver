/**
 *
 **/
module.exports = function (grunt) {
    var reportsFolder = 'reports';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                node: true,
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    describe: true,
                    it: true
                }
            }
        },
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: true,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: { src: ['test/*spec.js'] }
        },
        coveralls: {
            options: {
                // LCOV coverage file relevant to every target
                src: reportsFolder + '/coverage/lcov.info',

                // When true, grunt-coveralls will only print a warning rather than
                // an error, to prevent CI builds from failing unnecessarily (e.g. if
                // coveralls.io is down). Optional, defaults to false.
                force: false
            }
        },
        mocha_istanbul: {
            coverage: {
                src: 'test', // the folder, not the files,
                options: {
                    mask: '*.spec.js',
                    dryRun: true,
                    coverageFolder: reportsFolder + '/coverage'
                }
            },
            cobertura: {
                src: 'test', // the folder, not the files
                options: {
                    coverage: true,
                    check: {
                        lines: 75,
                        statements: 75
                    },
                    coverageFolder: reportsFolder + '/coverage',
                    root: './src', // define where the cover task should consider the root of libraries that are covered by tests
                    reportFormats: ['cobertura', 'lcovonly', 'html']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-coveralls');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');

    /*grunt.registerTask('default', ['jshint', 'simplemocha']);
    grunt.registerTask('test', ['simplemocha']);
    grunt.registerTask('ci', ['jshint', 'simplemocha']);
*/
    grunt.registerTask('default', ['jshint', 'simplemocha', 'mocha_istanbul:coverage', 'coveralls']);
    grunt.registerTask('test', ['simplemocha', 'mocha_istanbul:coverage', 'coveralls']);
    grunt.registerTask('cobertura', ['mocha_istanbul:cobertura']);
};