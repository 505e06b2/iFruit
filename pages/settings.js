//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];
const page_manager = arguments[1];

function setThemeOnPage(name) {
	document.body.className = "theme-" + name.toLowerCase().replace(/ /g, "-");
	//drawer only
	const css_colour = getComputedStyle(document.body).getPropertyValue("--fg_colour").trim(); //ONLY FOR HEX: #aaa
	const r = parseInt(css_colour[1]+css_colour[1], 16) / 255; //aa0000
	const g = parseInt(css_colour[2]+css_colour[2], 16) / 255; //00aa00
	const b = parseInt(css_colour[3]+css_colour[3], 16) / 255; //0000aa
	document.querySelector('#app-icon-filter-matrix').setAttribute("values", r + " 0 0 0 0\n0 " + g + " 0 0 0\n0 0 "+ b + " 0 0\n0 0 0 1 0");

	themeElemValue.innerHTML = "Theme: " + name;
}

let wakelockElem = document.createElement("empty");
const wakelockElemValue = _utils.createElement("div", {class: "small"});
const themeElemValue = _utils.createElement("div", {class: "small"});
let wakelock;
async function acquireWakelock(on_off) {
	try {
		if(on_off) {
			wakelock = await navigator.wakeLock.request("screen");
			wakelock.onrelease = () => {
				wakelock = undefined;
				//console.log("WAKELOCK OFF");
			};
			//console.log("WAKELOCK ON");
		} else {
			if(wakelock) wakelock.release();
		}
		wakelockElemValue.innerHTML = "Wakelock: " + ((on_off) ? "Enabled" : "Disabled");
	} catch {
		wakelockElemValue.innerHTML = "Wakelock: ?";
	}
}

if(page_manager.persistence.settings === undefined) page_manager.persistence.settings = {};

const values = page_manager.persistence.settings; //reference
if(!values.theme) values.theme = "Default";
if(!values.wakelock) values.wakelock = "Off";
setThemeOnPage(values.theme);

if("wakeLock" in navigator) {
	page_manager.settings.appendChild(wakelockElemValue);

	acquireWakelock(values.wakelock === "On");
	wakelockElem = _utils.createDropdown(
		"Wakelock:", {
			options: ["Off", "On"],
			value: values.wakelock,
			onchange: (select_tag) => {
				values.wakelock = select_tag.value;
				acquireWakelock(values.wakelock === "On");
			}
		})

	document.addEventListener("visibilitychange", async () => {
		if(!wakelock && document.visibilityState === "visible") acquireWakelock(values.wakelock === "On");
	});
}

page_manager.settings.appendChild(themeElemValue);

return _utils.createPage("settings", [
	_utils.createAppHeader("Settings"), //back button
	_utils.createDropdown("Theme:", {
		options: ["Default", "OLED Dark"],
		value: values.theme,
		onchange: (select_tag) => {
			values.theme = select_tag.value;
			setThemeOnPage(values.theme);
		}
	}),
	wakelockElem,
	_utils.createElement("button", {
		contents: "Clear Persistence",
		onclick: () => {
			if(window.confirm("Are you sure you want to delete all this application's data?")) {
				page_manager.persistence = undefined;
				window.onpopstate = () => { //determine outcome of history go
					location.reload();
					window.onpopstate = null;
				}
				history.go(-2);
			}
		}
	})
]);
