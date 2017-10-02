#!/bin/sh

mkdir -p build/vendor/@polymer
cp -r node_modules/@polymer build/vendor/
mkdir -p build/vendor/@webcomponents/webcomponentsjs
cp -r node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js build/vendor/@webcomponents/webcomponentsjs/
mkdir -p build/vendor/jquery/dist
cp -r node_modules/jquery/dist/jquery.min.js build/vendor/jquery/dist/
mkdir -p build/vendor/underscore
cp -r node_modules/underscore/underscore-min.js build/vendor/underscore
mkdir -p build/vendor/backbone
cp -r node_modules/backbone/backbone-min.js build/vendor/backbone
mkdir -p build/vendor/moment/min
cp -r node_modules/moment/min/moment.min.js build/vendor/moment/min
mkdir -p build/vendor/bootstrap/dist/js
cp -r node_modules/bootstrap/dist/js/bootstrap.min.js build/vendor/bootstrap/dist/js
mkdir -p build/vendor/bootstrap-table/dist
cp -r node_modules/bootstrap-table/dist/bootstrap-table.min.js build/vendor/bootstrap-table/dist
mkdir -p build/vendor/bootstrap-treeview/dist
cp -r node_modules/bootstrap-treeview/dist/bootstrap-treeview.min.js build/vendor/bootstrap-treeview/dist
mkdir -p build/vendor/bootstrap-colorpicker/dist/js
cp -r node_modules/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js build/vendor/bootstrap-colorpicker/dist/js
mkdir -p build/vendor/bootstrap-validator/dist
cp -r node_modules/bootstrap-validator/dist/validator.min.js build/vendor/bootstrap-validator/dist
mkdir -p build/vendor/eonasdan-bootstrap-datetimepicker/build/js
cp -r node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js build/vendor/eonasdan-bootstrap-datetimepicker/build/js
mkdir -p build/vendor/jspdf/dist
cp -r node_modules/jspdf/dist/jspdf.min.js build/vendor/jspdf/dist
mkdir -p build/vendor/highcharts/
cp -r node_modules/highcharts/highcharts.js build/vendor/highcharts/
mkdir -p build/vendor/qtip2/dist
cp -r node_modules/qtip2/dist/jquery.qtip.min.js build/vendor/qtip2/dist
mkdir -p build/vendor/urijs/src
cp -r node_modules/urijs/src/URI.min.js build/vendor/urijs/src
mkdir -p build/vendor/cookies-js/dist
cp -r node_modules/cookies-js/dist/cookies.min.js build/vendor/cookies-js/dist
mkdir -p build/vendor/crypto-js
cp -r node_modules/crypto-js/core.js build/vendor/crypto-js
cp -r node_modules/crypto-js/sha256.js build/vendor/crypto-js

mkdir -p build/vendor/bootstrap/dist/css/
cp -r node_modules/bootstrap/dist/css/bootstrap.min.css build/vendor/bootstrap/dist/css/
mkdir -p build/vendor/bootstrap-table/dist/
cp -r node_modules/bootstrap-table/dist/bootstrap-table.min.css build/vendor/bootstrap-table/dist/
mkdir -p build/vendor/bootstrap-treeview/dist/
cp -r node_modules/bootstrap-treeview/dist/bootstrap-treeview.min.css build/vendor/bootstrap-treeview/dist/
mkdir -p build/vendor/bootstrap-colorpicker/dist/css
cp -r node_modules/bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css build/vendor/bootstrap-colorpicker/dist/css
mkdir -p build/vendor/eonasdan-bootstrap-datetimepicker/build/css
cp -r node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css build/vendor/eonasdan-bootstrap-datetimepicker/build/css
mkdir -p build/vendor/font-awesome/css
cp -r node_modules/font-awesome/css/font-awesome.min.css build/vendor/font-awesome/css
mkdir -p build/vendor/qtip2/dist/
cp -r node_modules/qtip2/dist/jquery.qtip.min.css build/vendor/qtip2/dist/