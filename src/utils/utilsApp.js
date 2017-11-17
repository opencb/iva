class UtilsApp {

    // Notify api for Iva. http://bootstrap-notify.remabledesigns.com/
    static showNotify(options = {}, settings = {}, message = "", type = "INFO") {
        var types = {
            'ERROR': 'danger',
            'SUCCESS': 'success',
            'WARNING': 'warning',
            'INFO': 'info',
        };
        let settingsDefault = {
            placement: {
                from: "top",
                align: "center"
            },
            type: types[type] || types['INFO']
        };

        let optionsDefault = {
            message: message
        };

        settingsDefault = Object.assign({}, settingsDefault, settings);
        optionsDefault = Object.assign({}, optionsDefault, options);

        $.notify(optionsDefault, settingsDefault);
    }
}
