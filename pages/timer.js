//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];

return _utils.createPage("timer", [
	_utils.createAppHeader("Timer"), //back button
	_utils.createElement("div", {
		contents: "WIP, this will allow you to have timers on your home screen"
	})
]);
