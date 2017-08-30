
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
        copy: {
            dist: {
                files: [
                    {   expand: true, cwd: "node_modules", src: ["@webcomponents/webcomponentsjs/webcomponents-lite.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["jquery/dist/jquery.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["underscore/underscore-min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["backbone/backbone-min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["moment/min/moment.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["bootstrap/dist/js/bootstrap.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["bootstrap-table/dist/bootstrap-table.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["bootstrap-treeview/dist/bootstrap-treeview.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["bootstrap-validator/dist/validator.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["jspdf/dist/jspdf.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["highcharts/highcharts.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["qtip2/dist/jquery.qtip.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["urijs/src/URI.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["cookies-js/dist/cookies.min.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["crypto-js/core.js"], dest: "<%= build.path %>/vendors" },
                    {   expand: true, cwd: "node_modules", src: ["crypto-js/sha256.js"], dest: "<%= build.path %>/vendors" },

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

                    {   flatten: true, expand: true, cwd: "node_modules", src: ["bootstrap/dist/css/bootstrap.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "node_modules", src: ["bootstrap-table/dist/bootstrap-table.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "node_modules", src: ["bootstrap-treeview/dist/bootstrap-treeview.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "node_modules", src: ["bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "node_modules", src: ["eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "node_modules", src: ["font-awesome/css/font-awesome.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "node_modules", src: ["qtip2/dist/jquery.qtip.min.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "node_modules", src: ["font-awesome/fonts/*"], dest: "<%= build.path %>/fonts" },
                    {   flatten: true, expand: true, cwd: "lib", src: ["jsorolla/styles/css/style.css"], dest: "<%= build.path %>/css" },
                    {   flatten: true, expand: true, cwd: "lib", src: ["jsorolla/styles/img/*"], dest: "<%= build.path %>/img" },
                    // {   expand: true, cwd: "./node_modules", src: ["@polymer/polymer/polymer-element.html"], dest: "<%= build.vendor %>" }

                    {   expand: true, cwd: "src", src: ["index.html"], dest: "<%= build.path %>/" },
                    {   expand: true, cwd: "src", src: ["conf/config.js"], dest: "<%= build.path %>/" },
                    {   expand: true, cwd: "src", src: ["conf/interpretation.js"], dest: "<%= build.path %>/" },
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
                    stripComments: true
                },
                files: {
                    "<%= build.path %>/iva-app.html": "src/iva-app.html"
                }
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /\.\.\/node_modules/g,
                            replacement: "vendors"
                        },
                        {
                            match: /\.\.\/lib\/jsorolla\/src/g,
                            replacement: "jsorolla"
                        },
                        {
                            match: /\[\[importPath\]\]images/g,
                            replacement: "[[rootPath]]img"
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ["<%= build.path %>/index.html","<%= build.path %>/iva-app.html"], dest: "<%= build.path %>"}
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-processhtml");
    grunt.loadNpmTasks("grunt-vulcanize");
    grunt.loadNpmTasks("grunt-replace");

    grunt.registerTask("default", ["clean", "copy", "processhtml", "vulcanize", "replace"]);
    grunt.registerTask("cl", ["clean"]);
};
