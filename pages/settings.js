//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];
const page_manager = arguments[1];

if(page_manager.persistence.settings === undefined) page_manager.persistence.settings = {};

const values = page_manager.persistence.settings; //reference
if(!values.theme) values.theme = "Default";

return _utils.createPage("settings", [
	_utils.createAppHeader("Settings"), //back button
	_utils.createDropdown("Theme", {
		options: ["Default", "OLED Dark"],
		value: values.theme,
		onchange: (select_tag) => {values.theme = select_tag.value}
	}),
	_utils.createElement("button", {
		contents: "Clear Persistence",
		onclick: () => {
			if(window.confirm("Are you sure you want to delete all this application's data?")) {
				page_manager.persistence = undefined;
				window.onpopstate = () => { //determine outcome of history go
					location.reload();
					window.onpopstate = null;
				}
				history.go(-2);
			}
		}
	})
]);
