exclude=\
"/node_modules|"\
"/web_modules|"\
"lib/jsorolla/node_modules|"\
"lib/jsorolla/src/genome-browser|"\
"lib/jsorolla/src/core/webcomponents/loading-spinner.js|"\
"lib/jsorolla/src/core/NotificationUtils.js|"\
"lib/jsorolla/src/core/utils.js|"\
"lib/jsorolla/src/core/utilsNew.js|"\
"lib/jsorolla/src/core/webcomponents/PolymerUtils.js|"\
"lib/jsorolla/src/core/clients|"\
"lib/jsorolla/src/core/visualisation|"\
"lib/jsorolla/src/core/webcomponents/opencga/clinical/obsolete|"\
"lib/jsorolla/src/core/webcomponents/commons/filters/deprecated|"\
"lib/jsorolla/src/core/webcomponents/variant/deprecated|"\
"./deprecated|"\
"lib/jsorolla/src/core/webcomponents/Notification.js"

depcruise "lib/jsorolla/src/core/webcomponents/**/*.js" -x "^($exclude)" --output-type dot | dot -T svg > dependency.svg
depcruise "lib/jsorolla/src/core/webcomponents/**/*.js" -x "^($exclude)" --output-type json > dependency.json

# depcruise "lib/jsorolla/src/core/webcomponents/**/*.js" -x "^($exclude)" --output-type dot | dot -Gsplines=ortho -Grankdir=TD -T svg > dependency.svg
# depcruise "lib/jsorolla/src/core/webcomponents/**/*.js" -x "^($exclude)" --output-type ddot | dot -Gsplines=ortho -T svg > dependency.svg
