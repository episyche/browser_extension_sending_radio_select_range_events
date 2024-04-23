chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'start recording') {
      let page_url;
      chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
          page_url = tabs[0].url
          console.log("tab", tabs[0].url);


          chrome.windows.create({
              url: tabs[0].url,
              width: 370,
              height: 600,
          }, function (window) {
              var tabId = window.tabs[0].id;
              chrome.storage.sync.set({ mobiletabid: tabId });

              console.log("Tab ID in the new window: " + tabId);
          });
      });
  }

  else if (request.action === 'mousedown') {
      chrome.storage.sync.get("mobiletabid", function (data) {
          console.log("request.event", request.event)
          if (Object.keys(data)) {
              if (data.mobiletabid) {
                  chrome.tabs.sendMessage(data.mobiletabid, { message: 'id clicked', tabId: data.mobiletabid, "click_postion": request.event });
              }
          }
      })
  }
 
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabArray) {
      console.log('tabArray', tabArray)
  }
  );
  sendResponse({ status: 'ok' });
  let scrollPositions = {};

  
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === 'radioEvent') {
    chrome.storage.sync.get(['mobiletabid'], function (result) {
        let mobileTabId = result.mobiletabid;
        console.log('radioEvent', message, 'mobileTabId')
        chrome.tabs.sendMessage(mobileTabId, { type: 'radioEvent', message })
    })
}
else if (message.type === 'selectEvent') {
    chrome.storage.sync.get(['mobiletabid'], function (result) {
        let mobileTabId = result.mobiletabid;
        console.log('selectEvent', message, 'mobileTabId')
        chrome.tabs.sendMessage(mobileTabId, { type: 'selectEvent', message })
    })
}
else if (message.type === 'inputEvent') {
    chrome.storage.sync.get(['mobiletabid'], function (result) {
        let mobileTabId = result.mobiletabid;
        console.log('inputEvent', message, 'mobileTabId')
        chrome.tabs.sendMessage(mobileTabId, { type: 'inputEvent', message })
    })
}

})