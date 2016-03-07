var backgroundData = {}

// register chrome listener
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log('hu some one ask me something...');
        switch (request.type) {
            case "popup":
            case "default":

                console.log('ah, a popup request. I\'ll show it in the request tab');
                // show my page icon
                chrome.pageAction.show(sender.tab.id);

                // save request in property
                if (request.applicationInfo) {
                    backgroundData['applicationInfo'] = request.applicationInfo;
                }
                break;
        }
    });