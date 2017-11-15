let config = require('../../nightwatch.conf.js');

module.exports = {
    'Menu-without-login' : function (browser) {
        browser
            .url(config.URL_TEST)
            .windowMaximize()
            .waitForElementVisible('body', 1000)
            .assert.visible('nav')
            .pause(500)
            .assert.visible('div[id="bs-example-navbar-collapse-1"]')
            .pause(500)
            .assert.visible('#bs-example-navbar-collapse-1 > ul > li > a[href="#clinical"]')
            .click('#bs-example-navbar-collapse-1 > ul > li > a[href="#clinical"]')
            .pause(500)
            .waitForElementVisible('variant-clinical > span > h3', 1000)
            .assert.containsText('variant-clinical > span > h3', "No public projects available to browse. Please login to continue")
            .assert.visible('variant-clinical > span > h3')
            .saveScreenshot(config.imgpath(browser) + "menu.png")
            .end()
    },
    'Menu-with-login' : function (browser) {
        browser
            .url(config.URL_TEST)
            .windowMaximize()
            .waitForElementVisible('body', 1000)
            .assert.title('IVA')
            .assert.visible('a[id="loginButton"]')
            .pause(500)
            .click('a[id="loginButton"]')
            .pause(500)
            .assert.visible('input[id="opencgaUser"]')
            .setValue('input[id="opencgaUser"]', 'test')
            .assert.visible('input[id="opencgaPassword"]')
            .setValue('input[id="opencgaPassword"]', 'test')
            .assert.visible('button[type="submit"]')
            .click('button[type="submit"]')
            .waitForElementVisible('span[data-notify="message"]', 1000)
            .assert.containsText('span[data-notify="message"]', 'test has logged in.')
            .pause(500)
            .assert.visible('nav')
            .pause(500)
            .assert.visible('div[id="bs-example-navbar-collapse-1"]')
            .pause(500)
            .assert.visible('#bs-example-navbar-collapse-1 > ul > li > a[href="#clinical"]')
            .click('#bs-example-navbar-collapse-1 > ul > li > a[href="#clinical"]')
            .pause(500)
            .waitForElementVisible('variant-clinical-upload-new', 1000)
            .saveScreenshot(config.imgpath(browser) + "menu-upload.png")
            .end()
    }
}