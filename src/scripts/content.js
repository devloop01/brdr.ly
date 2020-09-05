// send dummy data to background script for the first time when a page loads
chrome.runtime.sendMessage({ from: "content" });

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.from == "background") {
		const { borderRadius, selector, widthProgress, heightProgress } = msg.data;

		if (selector) {
			const item = document.querySelector(selector);

			if (item) {
				if (borderRadius) item.style.borderRadius = borderRadius;

				if (widthProgress != undefined) document.documentElement.style.setProperty("--scale-x", widthProgress);

				if (heightProgress != undefined)
					document.documentElement.style.setProperty("--scale-y", heightProgress);

				if (widthProgress != undefined || heightProgress != undefined) {
					item.style.transform = "scaleX(var(--scale-x)) scaleY(var(--scale-y))";

					sendResponse({
						isDOMElValid: item != null,
						dimension: {
							width: item.getBoundingClientRect().width,
							height: item.getBoundingClientRect().height,
						},
					});
				}
			} else {
				console.warn(`The specified selector (${selector}) is not found!`);
			}
		}
	}
});
