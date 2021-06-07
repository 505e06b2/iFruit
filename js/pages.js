import home_page from "../pages/home.mjs";
import drawer_page from "../pages/drawer.mjs";

const page_dict = {
	"home": home_page,
	"drawer": drawer_page
}

window.changePage = (page_name) => {
	document.body.innerHTML = "";
	document.body.appendChild(page_dict[page_name]);
}

changePage("home");
