$(document).ready(function () {
    // localize my template
    INSPECTOR_JIRA.helper.localize();

    // Restore options
    var defaultOptions = {};
    $('.toSave').each(function (index, item) {
        defaultOptions[item.id] = $(item).attr('placeholder');
    });

    console.log('fetching data:' + JSON.stringify(defaultOptions));
    chrome.storage.sync.get(defaultOptions, function (items) {
        $.each(items,function(index,item){
            $('#'+index).val(item);
        });
    });

    // Save options
    $('#save').click(function () {

        var dataToSave = {};
        $('.toSave').each(function (index, item) {
            dataToSave[item.id] = item.value;
        });

        console.log('saving data:' + JSON.stringify(dataToSave));
        chrome.storage.sync.set(
            dataToSave,
            function () {
                var status = $('#status');
                status.text(chrome.i18n.getMessage('optionsSaved'));
                status.fadeIn();
                setTimeout(function () {
                    status.text = '';
                    status.fadeOut();
                }, 750);
            }
        );
    });
});
