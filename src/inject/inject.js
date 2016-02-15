var inspectorJira = function () {

    /**
     * Identifier Class
     *
     * @param app
     * @constructor
     */
    var JriaIdentifier = function (app) {
        this.app = (app == null) ? document : app;
        this.isJira = false;
        this.applicationData = {
            "devMode": false,
            "version": '',
            "build": '',
            "isBeta": false,
            "isRC": false,
            "provideMails": false
        }

    };

    JriaIdentifier.prototype = {

        /**
         * Identifies the given document for a jira instance
         *
         * @returns {boolean}
         */
        identify: function () {
            if (this.getMetaContentByName('application-name') == 'JIRA') {
                this.isJira = true;
            }

            return this.isJira;
        },

        /**
         * Get the meta elements from current app
         *
         * @param name
         * @param content
         * @returns {string}
         */
        getMetaContentByName: function (name, content) {
            var content = (content == null) ? 'content' : content;
            return this.app.querySelector("meta[name='" + name + "']").getAttribute(content);
        },

        /**
         * Fetch the application data from DOM
         *
         * @returns {{devMode: boolean, version: string, build: string, isBeta: boolean, isRC: boolean, provideMails: boolean}|*}
         */
        getApplicationData: function () {

            var metaTags = this.getMetaTags();

            for (var property in metaTags) {
                var value = this.getMetaContentByName(metaTags[property]);
                // crapy but ist works
                if (value === "true" || value === "false") {
                    value = JSON.parse(value);
                }

                this.applicationData[property] = value;

            }

            return this.applicationData;
        },

        /**
         * returns the jira specific metatags
         *
         * @returns {{devMode: string, version: string, build: string, isBeta: string, isRC: string, provideMails: string}}
         */
        getMetaTags: function () {

            var metaTags = {
                "devMode": "ajs-dev-mode",
                "version": "ajs-version-number",
                "build": "ajs-build-number",
                "isBeta": "ajs-is-beta",
                "isRC": "ajs-is-rc",
                "provideMails": "ajs-outgoing-mail-enabled"
            };

            return metaTags;
        }
    };

    // start the main script
    var jindentifier = new JriaIdentifier();

    if (jindentifier.identify()) {
        // send infos to the background script
        chrome.runtime.sendMessage({
            "applicationInfo": jindentifier.getApplicationData()
        });
    }

}();

// load inspector jira
document.addEventListener('DOMContentLoaded', inspectorJira, false);