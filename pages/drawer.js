//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];

function createIconPreload(href) {
	return _utils.createElement("link", {
		rel: "preload",
		href: href,
		as: "image"
	});
}

document.head.appendChild(createIconPreload("icons/app_rockstar.png"));
document.head.appendChild(createIconPreload("icons/app_rise.png"));

return _utils.createPage("drawer", [
	_utils.createAppHeader("Apps"), //back button
	_utils.createElement("div", {
		class: "grid",
		contents: [
			_utils.createAppButton("Timer", "", () => page.change("timer")),
			_utils.createAppButton("Newswire", "icons/app_rockstar.png", () => window.open("https://www.rockstargames.com/newswire")),
			_utils.createAppButton("Join RISE", "icons/app_rise.png", () => window.open("https://discord.com/invite/nh68GTv"))
		]
	})
]);
