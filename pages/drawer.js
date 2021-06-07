//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];

return _utils.createPage("drawer", [
	_utils.createAppHeader("Apps"), //back button
	_utils.createElement("div", {
		class: "grid",
		contents: [
			_utils.createAppButton("Join RISE", "icons/app_rise.png", () => (location.href = "https://discord.com/invite/nh68GTv"))
		]
	})
]);
