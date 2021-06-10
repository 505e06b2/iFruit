//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];
const page_manager = arguments[1];

let timedisplay = null;
let weather = null;

function getTimeWeatherValues() {
	const t = new GTATime();
	const hour = t.hour.toString().padStart(2, "0");
	const min = t.minute.toString().padStart(2, "0");
	return {"time": `${hour}:${min}`, "weather": t.weather.name};
}

setInterval(() => {
	if(timedisplay && weather) {
		const v = getTimeWeatherValues();
		timedisplay.innerHTML = v.time;
		weather.innerHTML = v.weather;
	}
}, 500);

const v = getTimeWeatherValues();

return _utils.createPage("home", [
	_utils.createHeaderFooter("header_time",
		timedisplay = _utils.createElement("div", {
			id: "home_timedisplay",
			contents: v.time
		})
	),
	_utils.createSection("Weather", [
		weather = _utils.createElement("div", { contents: v.weather })
	]),
	page_manager.home_timers = _utils.createSection("Timers", []),
	_utils.createHeaderFooter("footer",
		_utils.createElement("i", {
			id: "home_drawericon",
			class: "ri-grid-fill",
			onclick: () => page.change("drawer")
		})
	)
]);
