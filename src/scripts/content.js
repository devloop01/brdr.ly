chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log("Listening To Slider Events!");

	const { borderRadius, selector, widthProgress, heightProgress } = request;

	if (selector) {
		try {
			const item = document.querySelector(selector);

			if (borderRadius) item.style.borderRadius = borderRadius;

			if (widthProgress != undefined) document.documentElement.style.setProperty("--scale-x", widthProgress);

			if (heightProgress != undefined) document.documentElement.style.setProperty("--scale-y", heightProgress);

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
		} catch (err) {
			console.error(`The specified selector (${selector})  is not found!`);
		}
	}
});
