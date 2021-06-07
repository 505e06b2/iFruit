function setTimeWeatherValues() {
	const timedisplay = document.getElementById("home_timedisplay");
	const weather = document.getElementById("home_weather");
	if(timedisplay && weather) {
		const t = new GTATime();
		const hour = t.hour.toString().padStart(2, "0");
		const min = t.minute.toString().padStart(2, "0");
		timedisplay.innerHTML = `${hour}:${min}`;
		weather.innerHTML = t.weather.name;
	}
	document.body.style.visibility = "visible"; //ready
}

setInterval(setTimeWeatherValues, 500);

const ex = document.createElement("div");
ex.setAttribute("name", "home");
ex.className = "page";

ex.innerHTML = `
	<div class="header_time_spacing"></div>
	<div class="header_time">
		<div id="home_timedisplay">&nbsp;</div>
	</div>
	<div class="section_title">Weather</div>
	<div class="section" id="home_weather">&nbsp;</div>
	<div class="footer_spacing"></div>
	<div class="footer">
		<i id="home_drawericon" class="ri-grid-fill" onclick="changePage('drawer')"></i>
	</div>
`;

export default ex;
