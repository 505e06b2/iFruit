//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];
const page_manager = arguments[1];

return _utils.createPage("drawer", [
	_utils.createAppHeader("Apps"), //back button
	_utils.createElement("div", {
		class: "grid",
		contents: [
			_utils.createAppButton("Map", "icons/remixicon-map-pin-2-fill.svg", () => window.open("https://gta-5-map.com")),
			_utils.createAppButton("Newswire", "icons/remixicon-article-fill.svg", () => window.open("https://www.rockstargames.com/newswire")),
			_utils.createAppButton("/r/gtaglitches", "icons/remixicon-money-dollar-circle-fill.svg", () => window.open("https://www.reddit.com/r/gtaglitches/")),
			_utils.createAppButton("/r/gtaonline", "icons/remixicon-police-car-fill.svg", () => window.open("https://www.reddit.com/r/gtaonline/")),
			_utils.createAppButton("Settings", "icons/remixicon-settings-3-fill.svg", () => page.change("settings")),
			_utils.createAppButton("Timer", "icons/remixicon-time-fill.svg", () => page.change("timer")),
			_utils.createAppButton("Join RISE", "icons/app_rise.png", () => window.open("https://discord.com/invite/nh68GTv"))
		]
	})
]);
