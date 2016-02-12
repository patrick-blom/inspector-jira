var backgroundData = {}

// register chrome listener
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        // show my page icon
        chrome.pageAction.show(sender.tab.id);

        // save request in property
        if (request.applicationInfo) {
            backgroundData['applicationInfo'] = request.applicationInfo;
        }

        sendResponse();
    });