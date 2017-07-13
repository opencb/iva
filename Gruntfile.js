
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        build: {
            path: "build/<%= pkg.version %>",
            vendor: "<%= build.path %>/vendor"
        },
        clean: {
            dist: ["<%= build.path %>/*"]
        },
        jshint: {
            files: ["Gruntfile.js", "src/**/*.js"],
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
                    "./node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js",
                    "./node_modules/jquery/dist/jquery.js",
                    "./node_modules/bootstrap/dist/js/bootstrap.js",
                    "./node_modules/bootstrap-table/dist/bootstrap-table.js",
                    "./node_modules/bootstrap-treeview/dist/bootstrap-treeview.js",
                    "./node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js",
                    "./node_modules/bootstrap-validator/dist/validator.js",
                    "./node_modules/moment/moment.js",
                    "./node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.js",
                    "./node_modules/underscore/underscore.js",
                    "./node_modules/backbone/backbone.js",
                    "./node_modules/highcharts/highcharts.js",
                    "./node_modules/qtip2/dist/jquery.qtip.js",
                    "./node_modules/urijs/src/URI.js",
                    "./node_modules/cookies-js/dist/cookies.js",
                    "./node_modules/crypto-js/crypto-js.js"
                ],
                dest: "<%= build.path %>/vendors.js"
            }
            // ,jsorolla: {
            //     src: [
            //         "./lib/jsorolla/src/lib/clients/rest-client.js",
            //         "./lib/jsorolla/src/lib/clients/cellbase-client-config.js",
            //         "./lib//jsorolla/src/lib/clients/cellbase-client.js",
            //         "./lib/jsorolla/src/lib/clients/opencga-client-config.js",
            //         "./lib/jsorolla/src/lib/clients/opencga-client.js",
            //         "./lib/jsorolla/src/lib/cache/indexeddb-cache.js",
            //         "./lib/jsorolla/src/lib/utils.js",
            //         "./lib/jsorolla/src/lib/svg.js",
            //         "./lib/jsorolla/src/lib/region.js",
            //         "./lib/jsorolla/src/lib/visualisation/lollipop.js",
            //         "./lib/jsorolla/src/lib/opencga/variant/variant-utils.js"
            //     ],
            //     dest: "<%= build.path %>/jsorolla-clients.js"
            // }
            // ,genomeViewer: {
            //     src: [
            //         // "./lib/jsorolla/build/2.0.0-beta/genome-browser/gv-config.js",
            //         // "./lib/jsorolla/build/2.0.0-beta/genome-browser/genome-browser.js"
            //     ],
            //     dest: "<%= build.path %>/genome-browser.js"
            // }
        },
        uglify: {
            options: {
                banner: "/*! IVA <%= grunt.template.today(\"dd-mm-yyyy\") %> */\n"
            },
            dist: {
                files: {
                    "<%= build.path %>/vendors.min.js": ["<%= build.path %>/vendors.js"],
                    // '<%= build.path %>/jsorolla.min.js': ['<%= build.path %>/jsorolla-clients.js']
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {   expand: true, cwd: "lib/jsorolla/src/lib/", src: ["*.js"], dest: "<%= build.path %>/jsorolla/lib" },
                    {   expand: true, cwd: "lib/jsorolla/src/lib/cache/", src: ["*.js"], dest: "<%= build.path %>/jsorolla/lib/cache" },
                    {   expand: true, cwd: "lib/jsorolla/src/lib/clients/", src: ["*.js"], dest: "<%= build.path %>/jsorolla/lib/clients" },
                    {   expand: true, cwd: "lib/jsorolla/src/lib/webcomponents/", src: ["*.js"], dest: "<%= build.path %>/jsorolla/lib/webcomponents" },
                    {   expand: true, cwd: "lib/jsorolla/src/lib/webcomponents/opencga/variant/", src: ["*.js"], dest: "<%= build.path %>/jsorolla/lib/webcomponents/opencga/variant" },
                    {   expand: true, cwd: "lib/jsorolla/src/lib/data-adapter/", src: ["*.js"], dest: "<%= build.path %>/jsorolla/lib/data-adapter" },
                    {   expand: true, cwd: "lib/jsorolla/src/lib/visualisation/", src: ["*.js"], dest: "<%= build.path %>/jsorolla/lib/visualisation" },
                    {   expand: true, cwd: "lib/jsorolla/src/lib/widgets/feature/info/", src: ["*.js"], dest: "<%= build.path %>/jsorolla/lib/widgets/feature/info" },
                    {   expand: true, cwd: "lib/jsorolla/src/lib/widgets/", src: ["ux-window.js"], dest: "<%= build.path %>/jsorolla/lib/widgets" },
                    {   expand: true, cwd: "lib/jsorolla/src/genome-browser/", src: ["**"], dest: "<%= build.path %>/jsorolla/genome-browser" },
                    {   flatten: true, expand: true, cwd: "./node_modules", src: ["bootstrap/dist/css/bootstrap.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "./node_modules", src: ["bootstrap-table/dist/bootstrap-table.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "./node_modules", src: ["bootstrap-treeview/dist/bootstrap-treeview.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "./node_modules", src: ["bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "./node_modules", src: ["eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "./node_modules", src: ["font-awesome/css/font-awesome.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "./node_modules", src: ["qtip2/dist/jquery.qtip.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "./node_modules", src: ["font-awesome/fonts/*"], dest: "<%= build.path %>/fonts" },
                    {   flatten: true, expand: true, cwd: "./lib", src: ["jsorolla/styles/css/style.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "./lib", src: ["jsorolla/styles/img/*"], dest: "<%= build.path %>/img" },
                    // {   expand: true, cwd: "./node_modules", src: ["@polymer/polymer/polymer-element.html"], dest: "<%= build.vendor %>" },
                    {   expand: true, cwd: "src", src: ["index.html"], dest: "<%= build.path %>/" },
                    {   expand: true, cwd: "src", src: ["conf/config.js"], dest: "<%= build.path %>/" },
                    {   expand: true, cwd: "src", src: ["conf/tools.js"], dest: "<%= build.path %>/" },
                    {   expand: true, cwd: "src", src: ["conf/panels.js"], dest: "<%= build.path %>/" },
                    {   expand: true, cwd: "src", src: ["conf/icd10.js"], dest: "<%= build.path %>/" },
                    {   expand: true, cwd: "./", src: ["LICENSE"], dest: "<%= build.path %>/" },
                    {   expand: true, cwd: "src/img/", src: ["*"], dest: "<%= build.path %>/img" }
                ]
            }
        },
        processhtml: {
            options: {
                strip: true
            },
            dist: {
                files: {
                    "<%= build.path %>/index.html": ["src/index.html"]
                }
            }
        },
        vulcanize: {
            default: {
                options: {
                    // Task-specific options go here.
                    stripComments: true,
                    // excludes: ["node_modules/@polymer/polymer/polymer-element.html"]
                },
                files: {
                    "<%= build.path %>/iva-app.html": "src/iva-app.html"
                }
            }
        },
        // watch: {
        //     files: ["<%= jshint.files %>"],
        //     tasks: ["jshint"]
        // },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /\.\.\/node_modules/g,
                            replacement: "vendor"
                        },
                        {
                            match: /\.\.\/lib\/jsorolla\/src/g,
                            replacement: "jsorolla"
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ["<%= build.path %>/index.html"], dest: "<%= build.path %>"},
                    {expand: true, flatten: true, src: ["<%= build.path %>/iva-app.html"], dest: "<%= build.path %>"},

                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-processhtml");
    grunt.loadNpmTasks("grunt-vulcanize");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-replace");

    grunt.registerTask("default", ["clean", "jshint", "copy", "concat", "uglify", "processhtml", "vulcanize", "replace"]);
    grunt.registerTask("cl", ["clean"]);
};