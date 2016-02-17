!function () {
    console.log('BAM! enhanced injection successful!');

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

    $(document).on(JIRA.Events.ISSUE_REFRESHED, function () {

        var ch = new CookiesHandler();

        console.log('listen on a catched jira event')
        console.log(
            JSON.parse(atob(ch.readCookie('inspector_config')))
        );
    });
}();
