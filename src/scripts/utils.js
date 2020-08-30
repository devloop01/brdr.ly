function filterList(data, queries) {
	return queries.map((q) => data.filter((name) => name.toLowerCase().search(q.toLowerCase()) !== -1)).flat();
}

function returnComputedStyles(selector) {
	return window.getComputedStyle(document.querySelector(selector));
}

function returnHandlePosition(handleClass) {
	return {
		left: returnComputedStyles(handleClass).left.match(/\d+/g)[0],
		top: returnComputedStyles(handleClass).top.match(/\d+/g)[0],
	};
}

async function writeToClipboard(str) {
	try {
		await navigator.clipboard.writeText(str);
		console.log("copied to clipboard");
	} catch (err) {
		console.error("Failed to copy: ", err);
	}
}

function clamp(num, a, b) {
	return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
}

function map(n, start1, stop1, start2, stop2) {
	return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
