var page_action = function () {

    var PopUp = function (headline, headlinestate, itemcontainer) {
        this.headLine = headline;
        this.headLineState = headlinestate;
        this.itemcontainer = itemcontainer;
    };

    PopUp.prototype = {
        generate: function () {

        },
        /**
         * Gets the color css class for the template
         *
         * @param itemValue
         * @returns {string}
         */
        getColorClass: function (itemValue) {

            // set deafult
            var color = 'bg-info';

            // decide if green or red
            if (itemValue === true || itemValue == false) {
                color = (itemValue === true) ? 'bg-success' : 'bg-danger';
            }

            return color;
        },
        /**
         *
         * @param key the property identifier
         * @param value the property value
         * @param label the localized label
         * @param color the generated color
         * @returns {string}
         */
        getItemTemplate: function (key, value, label, color) {
            return  '<li class="property">' +
                        '<span class="jira-label ' + key + '">' + label + '</span>' +
                        '<span class="jira-badge round ' + color + '">' + value + '</span>' +
                    '</li>';
        }
    };


}();
$(document).ready(function () {

    chrome.runtime.getBackgroundPage(function (bg) {

        $('#headline').text(chrome.i18n.getMessage('PopupHeadline'))
        $('#headline-state').text(chrome.i18n.getMessage('PopupHeadlineStateOK'))

        $('#jira_properties').empty();

        $.each(bg.backgroundData.applicationInfo, function (index, item) {

            var color = '';
            if (item === true) {
                color = 'bg-success';
            } else if (item === false) {
                color = 'bg-danger';
            } else {
                color = 'bg-info';
            }

            var label = 'Popup_' + index;
            $('#jira_properties').append(
                '<li class="property"><span class="jira-label ' + index + '">' + chrome.i18n.getMessage(label) + '</span>' +
                '<span class="jira-badge round ' + color + '">' + item + '</span></li>'
            );
        });

    });


});