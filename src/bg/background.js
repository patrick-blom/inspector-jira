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
            case 'writeCookie':
                console.log('Oh, you need some config vaules? I\'ll write them to a cookie');

                //get the whole config
                chrome.storage.sync.get(null, function (items) {

                    var re = new RegExp(/^.+?[^\/:](?=[?\/]|$)/);
                    var url = re.exec(sender.url);
                    chrome.cookies.set({
                        "url": url[0],
                        "name": "inspector_config",
                        "value": btoa(JSON.stringify(items)) // base64 endcode the data
                    }, function (cookie) {
                        console.log(JSON.stringify(cookie));
                        console.log(chrome.extension.lastError);
                        console.log(chrome.runtime.lastError);
                    });

                    console.log('Ok, i\'m ready. Check your cookies');
                });
                break;
        }
    });