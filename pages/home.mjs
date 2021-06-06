function setHeaderValues() {
	const timedisplay = document.getElementById("home_timedisplay");
	const weekday = document.getElementById("home_weekday");
	if(timedisplay && weekday) {
		const t = new GTATime();
		const hour = t.hour.toString().padStart(2, "0");
		const min = t.minute.toString().padStart(2, "0");
		timedisplay.innerHTML = `${hour}:${min}`;
		weekday.innerHTML = t.weekday;
	}
}

const ex = document.createElement("div");
ex.setAttribute("name", "home");
ex.className = "page";

setHeaderValues();
setInterval(setHeaderValues, 500);

ex.innerHTML = `
	<div class="header_spacing"></div>
	<div class="header">
		<div>
			<div id="home_timedisplay">&nbsp;</div>
			<div id="home_weekday">&nbsp;</div>
		</div>
	</div>
	<div class="footer_spacing"></div>
	<div class="footer">#</div>
`;

export default ex;
