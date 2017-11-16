class UtilsApp {

    // Notify api for Iva. http://bootstrap-notify.remabledesigns.com/
    static showNotify(options = {}, settings = {}) {
        let settingsDefault = {
            placement: {
                from: "top",
                align: "center"
            }
        };

        settingsDefault = Object.assign({}, settingsDefault, settings);
        $.notify(options, settingsDefault);
    }
    static showNotifyError(message, options = {}, settings = {}) {
        let optionsDefault = {
            icon: 'glyphicon glyphicon-warning-sign',
            message: message

        };

        let settingsDefault = {
            type: 'danger'
        };

        settingsDefault = Object.assign({}, settingsDefault, settings);
        optionsDefault = Object.assign({}, optionsDefault, options);
        this.showNotify(optionsDefault, settingsDefault);
    }

    static showNotifySuccess(message, options = {}, settings = {}) {
        let optionsDefault = {
            icon: 'glyphicon glyphicon-warning-sign',
            message: message
        };

        let settingsDefault = {
            type: 'success'
        };
        settingsDefault = Object.assign({}, settingsDefault, settings);
        optionsDefault = Object.assign({}, optionsDefault, options);
        this.showNotify(optionsDefault, settingsDefault);
    }

    static showNotifyInfo(message, options = {}, settings = {}) {
        let optionsDefault = {
            icon: 'glyphicon glyphicon-warning-sign',
            message: message
        };

        let settingsDefault = {
            type: 'info'
        };
        settingsDefault = Object.assign({}, settingsDefault, settings);
        optionsDefault = Object.assign({}, optionsDefault, options);
        this.showNotify(optionsDefault, settingsDefault);
    }

    static showNotifyWarning(message, options = {}, settings = {}) {
        let optionsDefault = {
            icon: 'glyphicon glyphicon-warning-sign',
            message: message
        };

        let settingsDefault = {
            type: 'warning'
        };
        settingsDefault = Object.assign({}, settingsDefault, settings);
        optionsDefault = Object.assign({}, optionsDefault, options);
        this.showNotify(optionsDefault, settingsDefault);
    }

}
