var options = function () {

    var OpntionsHandler = function (saveSelector, stateSelector) {
        this.saveSelector = saveSelector;
        this.stateSelector = stateSelector;
    };

    OpntionsHandler.prototype = {
        /**
         * Get the saveSelector fields
         *
         * @returns {{}}
         * @private
         */
        _collectFields: function () {
            var fields = {};
            var elements = document.querySelectorAll(this.saveSelector);

            for (var element in elements) {
                fields[element.id] = element.value;
            }

            return fields;
        },
        /**
         * Get the Data from storage
         */
        getData: function () {
            chrome.storage.sync.get(this._collectFields(), function (items) {
                for (var item in items) {
                    var element = document.querySelector('#'.item);
                    if (element) {
                        if (element.getAttribute('type') == 'checkbox') {
                            element.checked = (items[item] == 'on') ? true : false;
                        } else {
                            element.value = items[item];
                        }
                    }
                }
            });
        },
        setData: function () {
            chrome.storage.sync.set(this._collectFields(), function () {
                var state = document.querySelector(this.stateSelector);
                state.innerHTML = chrome.i18n.getMessage('optionsSaved');
                state.className.replace('hidden', '');
                setTimeout(function () {
                    state.className = state.className + ' hidden';
                    state.innerHTML = "";
                }, 750);
            });
        }
    };

    // main script

    // localize my template
    INSPECTOR_JIRA.helper.localize();

    // get handler
    var oh = new OpntionsHandler('.toSave', '#status');

    // fetch data
    console.log('Yehaa! Fetching data from storage.');
    oh.getData();

    //add onlick event for set data
    document.querySelector('#save').addEventListener('click', function () {
        console.log('It seems there are some changes. After a detailed inspection i´ll save them.');
        oh.setData();
    }, false);

}();

// load the options
document.addEventListener('DOMContentLoaded', options, false);