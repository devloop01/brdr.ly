// All the extra functions are coming from utils.js

document.addEventListener("DOMContentLoaded", function () {
	console.clear();

	const APP_NAME = "BORDERLY";
	const NAME_SEPARATOR = "_";
	const NAME_CONFIG = APP_NAME + NAME_SEPARATOR;

	// **** DOM ELEMENTS - START ****

	// input color el
	const boxColorInput = document.getElementById("box-color");

	// element that shows the radius text
	const radiusText = document.querySelector(".border-radius__text");

	// COPY Button
	const copyBtn = document.getElementById("btn--copy");
	// checkbox
	const linkedCheckbox = document.getElementById("checkbox");
	// All the radius handles
	const radiusHandles = Array.from(document.querySelectorAll(".radius-handle"));
	// height & width sliders
	const heightSlider = document.querySelector(".height-slider");
	const widthSlider = document.querySelector(".width-slider");

	// extra options elements
	const documentActionsWrapperEl = document.querySelector(".document__actions");
	const moreBtn = document.getElementById("btn--more");
	const closeBtn = document.getElementById("btn--close");
	const copyDimensionCheckbox = document.getElementById("copy--dimensions__checkbox");
	const selectorTextInput = document.getElementById("selector--text");

	// **** DOM ELEMENTS - END ****

	// ROOT Styles
	const rootStyles = window.getComputedStyle(document.documentElement);

	// dimension variables
	const controlsWidth = rootStyles.getPropertyValue("--controls-width").match(/\d+/g)[0];
	const handleSize = rootStyles.getPropertyValue("--handle-size").match(/\d+/g)[0];

	// local stored variables
	const boxDimensions = JSON.parse(window.localStorage.getItem(NAME_CONFIG + "boxDimension"));
	const boxColor = window.localStorage.getItem(NAME_CONFIG + "boxColor");
	let DOMSelector = window.localStorage.getItem(NAME_CONFIG + "DOMSelector");
	let copyDOMElDimension = window.localStorage.getItem(NAME_CONFIG + "copyDOMElDimension") === "true" || false;
	// boolean variable that holds if the horizontal and vertcal radius are linked
	let linked = window.localStorage.getItem(NAME_CONFIG + "linked") === "true" || false;
	// variable that fetches radius values & radius handle positions from local storage
	const savedRadiusValues = JSON.parse(window.localStorage.getItem(NAME_CONFIG + "radiusValues"));
	const savedHandlePostions = JSON.parse(window.localStorage.getItem(NAME_CONFIG + "handlePositions"));

	let DOMElDimension = {};
	let isDOMElValid = false;

	let borderRadiusText = "";

	// This variable holds all the radius values
	const radius =
		savedRadiusValues != null
			? savedRadiusValues
			: {
					htl: { value: 0, start: 0 },
					htr: { value: 0, start: 100 },
					hbr: { value: 0, start: 100 },
					hbl: { value: 0, start: 0 },

					vtl: { value: 0, start: 0 },
					vtr: { value: 0, start: 0 },
					vbr: { value: 0, start: 100 },
					vbl: { value: 0, start: 100 },
			  };

	// This variable holds all the radius handle positions
	const handlePositions =
		savedHandlePostions != null
			? savedHandlePostions
			: {
					htl: { ...returnHandlePosition(".radius-handle-htl"), axis: "x", offset: 0 },
					htr: {
						...returnHandlePosition(".radius-handle-htr"),
						axis: "x",
						offset: controlsWidth - handleSize,
					},
					hbr: { ...returnHandlePosition(".radius-handle-hbr"), axis: "x", offset: 0 },
					hbl: {
						...returnHandlePosition(".radius-handle-hbl"),
						axis: "x",
						offset: controlsWidth - handleSize,
					},

					vtl: { ...returnHandlePosition(".radius-handle-vtl"), axis: "y", offset: 0 },
					vtr: {
						...returnHandlePosition(".radius-handle-vtr"),
						axis: "y",
						offset: controlsWidth - handleSize,
					},
					vbr: { ...returnHandlePosition(".radius-handle-vbr"), axis: "y", offset: 0 },
					vbl: {
						...returnHandlePosition(".radius-handle-vbl"),
						axis: "y",
						offset: controlsWidth - handleSize,
					},
			  };

	// init the app
	init();

	//**** EVENT LISTENERS - START ****
	copyBtn.addEventListener("click", () => {
		const str =
			copyDOMElDimension == false || isDOMElValid == false
				? radiusText.innerHTML + ";"
				: `
		${radiusText.innerHTML};
		width: ${DOMElDimension.width}px;
		height: ${DOMElDimension.height}px;
		`;
		writeToClipboard(str);
	});

	moreBtn.addEventListener("click", () => {
		documentActionsWrapperEl.classList.add("active");
	});

	closeBtn.addEventListener("click", () => {
		documentActionsWrapperEl.classList.remove("active");
	});

	linkedCheckbox.addEventListener("change", function () {
		linked = this.checked;
		updateLocalStorage();
	});

	copyDimensionCheckbox.addEventListener("change", function () {
		copyDOMElDimension = this.checked;
		sendDataAndUpdateLocalStorage();
	});

	boxColorInput.addEventListener("input", function () {
		document.documentElement.style.setProperty("--box-color", this.value);
		updateLocalStorage();
	});

	selectorTextInput.addEventListener("input", function () {
		DOMSelector = this.value;
		sendDataAndUpdateLocalStorage();
	});

	heightSlider.addEventListener("input", function () {
		document.documentElement.style.setProperty("--box-height", this.value + "px");
		sendDataAndUpdateLocalStorage();
	});

	widthSlider.addEventListener("input", function () {
		document.documentElement.style.setProperty("--box-width", this.value + "px");
		sendDataAndUpdateLocalStorage();
	});

	//**** EVENT LISTENERS - END ****

	function sendDataAndUpdateLocalStorage() {
		sendDataToTab();
		updateLocalStorage();
	}

	//**** Initialize Function ****
	function init() {
		updateRadiusText();
		initHandlePosition();
		changeRadiusTextFontSize();

		linkedCheckbox.checked = linked;
		copyDimensionCheckbox.checked = copyDOMElDimension;

		radiusHandles.forEach((handle) => {
			const axis = handle.classList.contains("radius-handle-x") ? "x" : "y";
			const draggie = new Draggabilly(handle, {
				axis,
				containment: ".radius--controls",
			});
			draggie.on("pointerMove", () =>
				onHandleMove(handle, axis, {
					x: draggie.position.x,
					y: draggie.position.y,
				})
			);
		});

		if (boxColor) {
			document.documentElement.style.setProperty("--box-color", boxColor);
			boxColorInput.value = boxColor;
		} else {
			boxColorInput.value = getComputedStyle(document.documentElement).getPropertyValue("--box-color").trim();
		}

		if (DOMSelector) selectorTextInput.value = DOMSelector;

		if (boxDimensions) {
			document.documentElement.style.setProperty("--box-width", boxDimensions.width + "px");
			document.documentElement.style.setProperty("--box-height", boxDimensions.height + "px");
			widthSlider.value = boxDimensions.width;
			heightSlider.value = boxDimensions.height;
			sendMessage({
				borderRadius: borderRadiusText,
				selector: DOMSelector,
				heightProgress: boxDimensions.height / heightSlider.max,
				widthProgress: boxDimensions.width / widthSlider.max,
			});
		}
	}

	// This function initializes the handle position from its saved positions that was stored in localstorage
	function initHandlePosition() {
		radiusHandles.forEach((handle) => {
			const key = filterList([...handle.classList], ["radius-handle-h", "radius-handle-v"])[0].slice(-3);
			const axis = key.startsWith("h") ? "x" : "y";
			let val = Math.abs(
				radius[key].start -
					Math.floor(
						((axis === "x" ? handlePositions[key].left : handlePositions[key].top) /
							(controlsWidth - handleSize - 2)) *
							100
					)
			);
			val = clamp(val, 0, 100);

			handle.style.left = handlePositions[key].left + "px";
			handle.style.top = handlePositions[key].top + "px";

			updateRadius(key)(val);
		});
	}

	function onHandleMove(handle, axis, position) {
		const key = filterList([...handle.classList], ["radius-handle-h", "radius-handle-v"])[0].slice(-3);
		let val = Math.abs(
			radius[key].start -
				Math.floor(((axis === "x" ? position.x : position.y) / (controlsWidth - handleSize - 2)) * 100)
		);
		val = clamp(val, 0, 100);
		const link = key.startsWith("h") ? key.replace("h", "v") : key.replace("v", "h");

		radius[key].value = val;

		handlePositions[key].left = position.x;
		handlePositions[key].top = position.y;

		updateRadius(key, link)(val);

		// updated linked handles position if linked is true
		if (linked) {
			radius[link].value = val;
			if (handlePositions[link].axis == "x") {
				handlePositions[link].left = Math.abs(handlePositions[link].offset - position.y);
				document.querySelector(`.radius-handle-${link}`).style.left = handlePositions[link].left + "px";
			} else {
				handlePositions[link].top = Math.abs(handlePositions[link].offset - position.x);
				document.querySelector(`.radius-handle-${link}`).style.top = handlePositions[link].top + "px";
			}
		}

		changeRadiusTextFontSize();
		updateRadiusText();
		sendDataToTab();
		updateLocalStorage();
	}

	function changeRadiusTextFontSize() {
		const fontSize = map(clamp(Math.round((borderRadiusText.length / 42) * 12), 10, 12), 10, 12, 12, 10);
		document.documentElement.style.setProperty("--radius-text-font-size", fontSize + "px");
	}

	// this function sends all the data required to the current tab
	function sendDataToTab() {
		sendMessage({
			borderRadius: borderRadiusText,
			selector: DOMSelector,
			heightProgress: heightSlider.value / heightSlider.max,
			widthProgress: widthSlider.value / widthSlider.max,
		});
	}

	function updateRadiusText() {
		borderRadiusText = `${radius.htl.value}% ${radius.htr.value}% ${radius.hbr.value}% ${radius.hbl.value}% / ${radius.vtl.value}% ${radius.vtr.value}% ${radius.vbr.value}% ${radius.vbl.value}%`;
		radiusText.innerHTML = `border-radius: ${borderRadiusText}`;
	}

	function updateLocalStorage() {
		window.localStorage.setItem(NAME_CONFIG + "radiusValues", JSON.stringify(radius));
		window.localStorage.setItem(NAME_CONFIG + "handlePositions", JSON.stringify(handlePositions));
		window.localStorage.setItem(NAME_CONFIG + "linked", linked);
		window.localStorage.setItem(
			NAME_CONFIG + "boxDimension",
			JSON.stringify({
				width: widthSlider.value,
				height: heightSlider.value,
			})
		);
		window.localStorage.setItem(NAME_CONFIG + "boxColor", boxColorInput.value);
		window.localStorage.setItem(NAME_CONFIG + "DOMSelector", selectorTextInput.value);
		window.localStorage.setItem(NAME_CONFIG + "copyDOMElDimension", copyDOMElDimension);
	}

	function updateRadius(target, link) {
		return function (value) {
			document.documentElement.style.setProperty(`--${target}`, value);
			if (linked && link) document.documentElement.style.setProperty(`--${link}`, value);
		};
	}

	function sendMessage(data) {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, data, (response) => {
				copyDimensionCheckbox.disabled = response === undefined;

				if (response !== undefined) {
					isDOMElValid = response.isDOMElValid;
					if (isDOMElValid && response.dimension && copyDOMElDimension)
						DOMElDimension = { ...response.dimension };
				} else {
					copyDimensionCheckbox.checked = false;
				}
			});
		});
	}
});
