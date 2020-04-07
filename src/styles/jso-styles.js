module.exports = `<style type="text/css">
    /*!
     * Some element from Boostrap v2
     * Bootstrap v2 (http://getbootstrap.com)
     * Copyright 2011-2015 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     *//*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */
    .dropdown-submenu {
        position: relative;
    }

    .dropdown-submenu > .dropdown-menu {
        top: 0;
        left: 100%;
        margin-top: -6px;
        margin-left: -1px;
        -webkit-border-radius: 0 6px 6px 6px;
        -moz-border-radius: 0 6px 6px 6px;
        border-radius: 0 6px 6px 6px;
    }

    .dropdown-submenu:hover > .dropdown-menu {
        display: block;
    }

    .dropdown-submenu > a:after {
        display: block;
        content: " ";
        float: right;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 5px 0 5px 5px;
        border-left-color: #cccccc;
        margin-top: 5px;
        margin-right: -10px;
    }

    .dropdown-submenu:hover > a:after {
        border-left-color: #ffffff;
    }

    .dropdown-submenu.pull-left {
        float: none;
    }

    .dropdown-submenu.pull-left > .dropdown-menu {
        left: -100%;
        margin-left: 10px;
        -webkit-border-radius: 6px 0 6px 6px;
        -moz-border-radius: 6px 0 6px 6px;
        border-radius: 6px 0 6px 6px;
    }

    /*# sourceMappingURL=bootstrap.min.css.map */

    .navbar .divider-vertical {
        height: 50px;
        margin: 0 9px;
        border-right: 1px solid #ffffff;
        border-left: 1px solid #f2f2f2;
    }

    .navbar-inverse .divider-vertical {
        border-left-color: #777777;
        border-right-color: #777777;
    }

    @media (max-width: 767px) {
        .navbar-collapse .nav > .divider-vertical {
            display: none;
        }
    }

</style>`;
