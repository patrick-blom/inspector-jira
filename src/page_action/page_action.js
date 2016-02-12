$(document).ready(function () {

    chrome.runtime.getBackgroundPage(function (bg) {

        $('#headline').text(chrome.i18n.getMessage('PopupHeadline'))
        $('#headline-state').text(chrome.i18n.getMessage('PopupHeadlineStateOK'))

        $('#jira_properties').empty();

        $.each(bg.backgroundData.applicationInfo, function (index, item) {

            if(index === "isJira"){
                return true;
            }

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