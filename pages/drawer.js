//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];

return _utils.createPage("drawer", [
	_utils.createAppHeader("Apps"), //back button
	_utils.createElement("div", {
		class: "grid",
		contents: [
			_utils.createAppButton("Timer", "icons/remixicon-time-fill.svg", () => page.change("timer")),
			//_utils.createAppButton("Settings", "icons/remixicon-settings-3-fill.svg", () => page.change("settings")),
			_utils.createAppButton("Newswire", "icons/app_rockstar.png", () => window.open("https://www.rockstargames.com/newswire")),
			_utils.createAppButton("Join RISE", "icons/app_rise.png", () => window.open("https://discord.com/invite/nh68GTv"))
		]
	})
]);
