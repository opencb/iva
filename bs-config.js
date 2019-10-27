/*
 |--------------------------------------------------------------------------
 | IVA Browser-sync config file
 |--------------------------------------------------------------------------
 */
module.exports = {
    files: [
        "src",
        "lib/jsorolla/src",
        "lib/jsorolla/styles"
    ],
    server: true,
    startPath: "src",
    open: true,
    timestamps: true,
    excludedFileTypes: [],
    notify: {
        styles: {
            top: 'auto',
            bottom: '0'
        }
    }

};
