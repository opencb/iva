class UtilsApp {

    // Notify api for Iva. http://bootstrap-notify.remabledesigns.com/
    static showNotify(options = {}, settings = {}, message = "", type = "INFO", notifyInstance = null) {
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

        if (UtilsNew.isNotUndefinedOrNull(notifyInstance)) {
            notifyInstance.update('message', message);
            return notifyInstance;
        }

        return $.notify(optionsDefault, settingsDefault);
    }
}
