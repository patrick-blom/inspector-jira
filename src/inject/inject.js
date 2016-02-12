$(document).ready(function () {

    // set basics
    var applicationInfo = {
        "isJira": false
    };

    // check if current page is a jira
    if ($('meta[name=application-name]').attr('content') == 'JIRA') {
        applicationInfo.isJira = true;
    }

    // fetch some informations
    if (applicationInfo.isJira) {
        var metaTags = {
            "devMode": "ajs-dev-mode",
            "version": "ajs-version-number",
            "build": "ajs-build-number",
            "isBeta": "ajs-is-beta",
            "isRC": "ajs-is-rc",
            "provideMails": "ajs-outgoing-mail-enabled"
        };

        $.each(metaTags, function (index, item) {

            var value = $('meta[name=' + item + ']').attr('content');
            if (value === "true" || value === "false") {
                value = JSON.parse(value);
            }

            applicationInfo[index] = value;
        });

        // send infos to the background script
        chrome.runtime.sendMessage({
            "applicationInfo": applicationInfo
        });

    }
});
