let contentTabId;

chrome.runtime.onMessage.addListener(function (msg, sender) {
	if (msg.from == "content") {
		contentTabId = sender.tab.id;
		console.log("data recieving from content!");
	}
	if (msg.from == "popup" && contentTabId) {
		console.log("data recieving from popup!");
		const sendData = {
			from: "background",
			data: msg.data,
		};
		chrome.tabs.sendMessage(contentTabId, sendData, (response) => {
			chrome.runtime.sendMessage({ from: "background", data: response });
		});
	}
});
