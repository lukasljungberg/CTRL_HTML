chrome.commands.onCommand.addListener(function (command) {
    if (command === "toggle-search-box") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "toggle-search-box" });
        });
    }
});
