chrome.webRequest.onCompleted.addListener(scanHeaders, {
  urls: ["<all_urls>"],
  types: ["main_frame"]
}, ["responseHeaders"]);

function scanHeaders(details) {
  for (var i = 0; i < details.responseHeaders.length; ++i) {
    var header = details.responseHeaders[i]
    if (header.name && header.name.toLowerCase() == 'x-zendesk-origin-server') {
      sendMessage(details.tabId, header.value);
    }
  }
}

function sendMessage(tabId, hostName) {
  chrome.tabs.executeScript(tabId, {
    file: 'injected.js',
    runAt: 'document_idle',
  }, function(){
    chrome.tabs.sendMessage(tabId, {hostHeader: hostName});
  });
}
