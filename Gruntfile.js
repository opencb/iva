
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build: {
            path: 'build/<%= pkg.version %>',
            vendor: '<%= build.path %>/vendor'
        },
        clean: {
            dist: ['<%= build.path %>/*']
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        concat: {
            options: {
                sourceMap: true
            },
            vendors: {
                src: [
                    './bower_components/webcomponentsjs/webcomponents-lite.js',
                    './bower_components/jquery/dist/jquery.js',
                    './bower_components/underscore/underscore.js',
                    './bower_components/backbone/backbone.js',
                    './bower_components/highcharts-release/highcharts.js',
                    './bower_components/qtip2/jquery.qtip.js',
                    './bower_components/uri.js/src/URI.js',
                    './bower_components/cookies-js/src/cookies.js',
                    './bower_components/moment/moment.js'
                ],
                dest: '<%= build.path %>/vendors.js'
            },
            jsorolla: {
                src: [
                    './lib/jsorolla/src/lib/clients/rest-client.js',
                    './lib/jsorolla/src/lib/clients/cellbase-client-config.js',
                    './lib//jsorolla/src/lib/clients/cellbase-client.js',
                    './lib/jsorolla/src/lib/clients/opencga-client-config.js',
                    './lib/jsorolla/src/lib/clients/opencga-client.js',
                    './lib/jsorolla/src/lib/cache/indexeddb-cache.js',
                    './lib/jsorolla/src/lib/utils.js'
                ],
                dest: '<%= build.path %>/jsorolla-clients.js'
            },
            genomeViewer: {
                src: [
                    './lib/jsorolla/build/2.0.0-beta/genome-viewer/gv-config.js',
                    './lib/jsorolla/build/2.0.0-beta/genome-viewer/genome-viewer.js'
                ],
                dest: '<%= build.path %>/genome-viewer.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! IVA <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= build.path %>/vendors.min.js': ['<%= build.path %>/vendors.js'],
                    // '<%= build.path %>/jsorolla.min.js': ['<%= build.path %>/jsorolla-clients.js']
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {   flatten: true, expand: true, cwd: './bower_components', src: ['fontawesome/css/font-awesome.min.css'], dest: '<%= build.path %>/css' },
                    {   flatten: true, expand: true, cwd: './bower_components', src: ['qtip2/jquery.qtip.min.css'], dest: '<%= build.path %>/css' },
                    {   flatten: true, expand: true, cwd: './bower_components', src: ['fontawesome/fonts/*'], dest: '<%= build.path %>/fonts' },
                    {   flatten: true, expand: true, cwd: './lib', src: ['jsorolla/styles/css/style.css'], dest: '<%= build.path %>/css' },
                    {   expand: true, cwd: './bower_components', src: ['polymer/*'], dest: '<%= build.vendor %>' },
                    {   expand: true, cwd: 'src', src: ['index.html'], dest: '<%= build.path %>/' },
                    {   expand: true, cwd: 'src', src: ['config.js'], dest: '<%= build.path %>/' },
                    {   expand: true, cwd: './', src: ['LICENSE'], dest: '<%= build.path %>/' },
                    {   expand: true, cwd: 'src', src: ['images/*'], dest: '<%= build.path %>/' }
                ]
            }
        },
        processhtml: {
            options: {
                strip: true
            },
            dist: {
                files: {
                    '<%= build.path %>/index.html': ['src/index.html']
                }
            }
        },
        vulcanize: {
            default: {
                options: {
                    // Task-specific options go here.
                    stripComments: true,
                    excludes: ["bower_components/polymer/polymer.html"]
                },
                files: {
                    '<%= build.path %>/iva-app.html': 'src/iva-app.html'
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /\.\.\/bower_components/g,
                            replacement: 'vendor'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['<%= build.path %>/index.html'], dest: '<%= build.path %>'},
                    {expand: true, flatten: true, src: ['<%= build.path %>/iva-app.html'], dest: '<%= build.path %>'},

                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-vulcanize');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default', ['clean', 'jshint', 'copy', 'concat', 'uglify', 'processhtml', 'vulcanize', 'replace']);
    grunt.registerTask('cl', ['clean']);
};