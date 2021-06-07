//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];

function getTimeWeatherValues() {
	const t = new GTATime();
	const hour = t.hour.toString().padStart(2, "0");
	const min = t.minute.toString().padStart(2, "0");
	return {"time": `${hour}:${min}`, "weather": t.weather.name};
}

function setTimeWeatherValues() {
	const timedisplay = document.getElementById("home_timedisplay");
	const weather = document.getElementById("home_weather");
	if(timedisplay && weather) {
		const v = getTimeWeatherValues();
		timedisplay.innerHTML = v.time;
		weather.innerHTML = v.weather;
	}
}

setInterval(setTimeWeatherValues, 500);

const v = getTimeWeatherValues();

return _utils.createPage("home", [
	_utils.createHeaderFooter("header_time",
		_utils.createElement("div", {
			id: "home_timedisplay",
			contents: v.time
		})
	),
	_utils.createSection("Weather", [
		_utils.createElement("div", {
			id: "home_weather",
			contents: v.weather
		})
	]),
	_utils.createHeaderFooter("footer",
		_utils.createElement("img", {
			id: "home_drawericon",
			src: "icons/remixicon-grid-fill.svg",
			onclick: () => page.change("drawer")
		})
	)
]);
