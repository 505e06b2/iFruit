const ex = document.createElement("div");
ex.setAttribute("name", "drawer");
ex.className = "page";

ex.innerHTML = `
	<div class="header_spacing"></div>
	<div class="header" onclick="changePage('home')">
		<i class="ri-arrow-left-circle-line"></i>
	</div>
	<div class="section" id="home_weather">&nbsp;</div>
`;

export default ex;
