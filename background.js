chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "loadContents") {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'checkPokemons' });
    });
  }
});
