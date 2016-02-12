// init global Namespace
var INSPECTOR_JIRA = {};

INSPECTOR_JIRA.helper = {
    /**
     * Constructor
     * @private
     */
    _create: function () {
        var $ = jQuery;
        var self = $(this);
    },
    /**
     * localize the templates
     */
    localizeTemplate: function () {
        $('html').each(function (index, element) {

            var valStrH = element.innerHTML.toString();
            var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
                return v1 ? chrome.i18n.getMessage(v1) : "";
            });

            if (valNewH != valStrH) {
                element.innerHTML = valNewH;
            }
        });
    }
};

