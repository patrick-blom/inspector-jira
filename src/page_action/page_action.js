var page_action = function () {

    var PopUp = function (headline, headlinestate, popupcontainer, itemdata) {
        this.headLine = headline;
        this.headLineState = headlinestate;
        this.popUpConatiner = popupcontainer;
        this.itemData = itemdata;
    };

    PopUp.prototype = {

        /**
         * Generates the popup
         */
        generate: function () {

            if (this.itemData === null) {
                return;
            }

            // add the popup head
            this.popUpConatiner.innerHTML = this.getHeadTemplate(
                this.headLine,
                this.headLineState
            );

            // generate item container
            var ul = document.createElement('ul');
            ul.id = "jira_properties";
            this.popUpConatiner.appendChild(ul);

            // generate the items
            for (var property in this.itemData) {

                var item = document.createElement('li');
                item.className = "property";
                item.innerHTML = this.getItemTemplate(
                    property,
                    this.itemData[property],
                    chrome.i18n.getMessage('Popup_' + property),
                    this.getColorClass(this.itemData[property])
                )

                document.querySelector('#jira_properties').appendChild(item);

            }
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
         * Returns hte item template
         *
         * @param key the property identifier
         * @param value the property value
         * @param label the localized label
         * @param color the generated color
         * @returns {string}
         */
        getItemTemplate: function (key, value, label, color) {

            return '<span class="jira-label ' + key + '">' + label + '</span>' +
                '<span class="jira-badge round ' + color + '">' + value + '</span>';
        },
        /**
         * Returns the headline template
         *
         * @param headline
         * @param headlinestate
         * @returns {string}
         */
        getHeadTemplate: function (headline, headlinestate) {

            return '<p id="headline">' + headline + '</p>' +
                '<p id="headline-state" class="bg-success round">' + headlinestate + '</p>' +
                '<hr>';
        }
    };

    // Get the background page and generate the popup
    chrome.runtime.getBackgroundPage(function (bg) {

        var popup = new PopUp(
            chrome.i18n.getMessage('PopupHeadline'),
            chrome.i18n.getMessage('PopupHeadlineStateOK'),
            document.querySelector('#mainPopup'),
            bg.backgroundData.applicationInfo
        );

        popup.generate();
    });

}();

// load the page_action
document.addEventListener('DOMContentLoaded', page_action, false);