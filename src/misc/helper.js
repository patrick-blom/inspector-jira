// add global namespace
var INSPECTOR_JIRA = {};

// init my helper class
!function () {

    /**
     * Initialize helper class
     * @constructor
     */
    var InspectorHelper = function () {
        this.instance = document;
        console.log('helper loaded');
    };

    InspectorHelper.prototype = {

        /**
         * localize a set of elements
         * @param elements
         */
        localize: function (elements) {

            console.log('localize template');

            if (elements == null) {
                elements = this.instance.getElementsByTagName("*");
            }

            for (var i = 0, max = elements.length; i < max; i++) {
                var valStrH = elements[i].innerHTML.toString();
                var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
                    return v1 ? chrome.i18n.getMessage(v1) : "";
                });

                if (valNewH != valStrH) {
                    elements[i].innerHTML = valNewH;
                }
            }
        }
    };

    INSPECTOR_JIRA.helper = new InspectorHelper();
}();

