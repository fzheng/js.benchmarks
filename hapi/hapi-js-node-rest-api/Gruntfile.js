/***
 *
 *
 * API Grunt File
 *
 * Basic setup used for development
 *
 * @param grunt
 *
 */


module.exports = function (grunt) {

    //Load all grunt tasks (load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns )
    require('load-grunt-tasks')(grunt);

    // Grunt Setup...
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'), // Packages are read in from here



        // REPLACE
        // Fixes https://github.com/sindresorhus/grunt-sass/pull/54
        // node-sass has a bug where it doesn't produce source files with
        // correct directory mappings. This Patches that error.

        replace: {
            sourcemap: {
                src: ['source.map'],
                dest: 'source.map',
                replacements: [{
                    from: 'app/',
                    to: ''
                }]
            },
            sass: {
                src: ['css/*.css'],
                dest: 'css/',
                replacements: [{
                    from: 'sourceMappingURL=source.map',
                    to: 'sourceMappingURL=../source.map'
                }]
            }
        },

        // CLEAN
        // Fixes https://github.com/sindresorhus/grunt-sass/pull/54
        // Deletes the extra mapping file produced by above bug

        clean: {
            sourcemap: ['css/source.map']
        },


        'jsdoc': {
            dist: {
                src: ['components/**/*.js', 'README.md'],
                dest: 'docs',
                template: 'jsdoc',
                options: {}
            }
        },






        // WATCH
        // Continuously watch certain files and run previously-defined tasks upon detecting a change

        watch: {
            sass_to_css: {
                files: 'app/sass/**/*.scss',
                tasks: [
                    //'scsslint:light',
                    'sass'
                ]
            },
            //component_library: {
            //    files: ['component-library/source/**/*.html', 'component-library/source/**/*.css'],
            //    tasks: ['jekyll:dev']
            //},
            //css_linting: {
            //    files: ['css/main.css'],
            //    tasks: ['csslint:lax'],
            //    options: {
            //        debounceDelay: 4000
            //    }
            //},
            sourcemap_cleanup: {
                files: ['app/css/*.css'],
                tasks: ['replace', 'clean:sourcemap']
            }
        },


        // TESTING (e2e)
        // ------------------------------------

        // Protractor
        // @see - http://stackoverflow.com/questions/19066747/integrating-protractor-with-yeoman-via-grunt
        protractor: {
            options: {
                keepAlive: true,
                configFile: "tests/e2e/protractor.conf.js"
            },
            //singlerun: {},
            //auto: {
            //    keepAlive: true,
            //    options: {
            //        args: {
            //            seleniumPort: 4444
            //        }
            //    }
            //},
            run: {}
        },

        //// Protractor Webdriver
        //protractor_webdriver: {
        //    //options: {
        //    //    // Task-specific options go here.
        //    //    //keepAlive: true
        //    //},
        //    //default: {
        //    //
        //    //    // Target-specific file lists and/or options go here.
        //    //    //command: 'node ./node_modules/protractor/bin/webdriver-manager update --standalone --chrome',
        //    //    command: 'node ./node_modules/protractor/bin/webdriver-manager start'
        //    //}
        //
        //    start: {
        //        options: {
        //            path: './node_modules/protractor/bin/',
        //            command: 'webdriver-manager start',
        //        },
        //    },
        //},


        // TESTING (unit)
        // ------------------------------------

        // KARMA
        karma: {
            core: {
                configFile: 'karma.conf.js',
                runnerPort: 9999,
                singleRun: true,
                browsers: ['PhantomJS'],
                logLevel: 'INFO',
                background: false
            }

        },


    });



    // GRUNT RUNNER
    // Set tasks to run at Grunt initial launch
    grunt.registerTask('build', [
        //'bless',
        //'scsslint:light', // needs time to cleanup
        'sass',
        //'csslint:lax',
        //'replace',
        //'clean:sourcemap',
        //'jekyll:dev'
    ]);


    grunt.registerTask('reports', [
        'build',
        'karma',
        'jsdoc-ng'
    ]);

    grunt.registerTask('test', [
        //'build',
        'karma',
        'protractor:run'
    ]);

    grunt.registerTask('default', [
        'build',
        //'test',
        'watch'
    ]);





};