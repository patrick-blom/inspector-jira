!function () {
    console.log('BAM! enhanced injection successful!');

    /**
     * Cookie Handler
     *
     * @constructor
     */
    var CookiesHandler = function () {
        this.cookies = null;
    };

    CookiesHandler.prototype = {
        readCookie: function (name, c, C, i) {
            if (this.cookies) {
                return this.cookies[name];
            }

            c = document.cookie.split('; ');
            this.cookies = {};

            for (i = c.length - 1; i >= 0; i--) {
                C = c[i].split('=');
                this.cookies[C[0]] = C[1];
            }

            return this.cookies[name];
        }
    }

    /**
     * Combination Handler
     *
     * @param startIds
     * @param stopIds
     * @constructor
     */
    var CombineHandler = function (startIds, stopIds) {
        this.startIds = startIds;
        this.stopIds = stopIds;
    };

    CombineHandler.prototype = {
        isTempoInstalled: function () {
            return !!$('#tempo_menu').length;
        },
        showTracker: function () {
            if ($('#tempo-bar').is(":visible") === false &&
                this.isTempoInstalled() === true) {
                $('#tempo-bar').show();
            }
        }
    };

    // Main script
    var ch = new CookiesHandler();
    var inspector_config = JSON.parse(atob(ch.readCookie('inspector_config')));

    $(document).ready(function () {
        if (inspector_config.enableCombineTicketAndTracker === true) {
            var cmh = new CombineHandler(inspector_config.playButtonJunction, inspector_config.stopButtonJunction);

            if (cmh.isTempoInstalled() === true) {
                console.log('Tempoplugin found! Now i\'ll show the Tracker ');
                cmh.showTracker();
            }
        }
    });


    $(document).on(JIRA.Events.ISSUE_REFRESHED, function () {

        console.log('listen on a catched jira event')
        console.log(
            JSON.parse(atob(ch.readCookie('inspector_config')))
        );
    });
}();
