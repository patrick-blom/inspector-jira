var backgroundData = {}

// register chrome listener
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        switch (request.type){
            case "popup":
            case "default":
                // show my page icon
                chrome.pageAction.show(sender.tab.id);

                // save request in property
                if (request.applicationInfo) {
                    backgroundData['applicationInfo'] = request.applicationInfo;
                }
                break;
            case 'config':
                //get the whole config
                chrome.storage.sync.get(null, function (items) {
                    sendResponse(items);
                });
                break;
        }
    });