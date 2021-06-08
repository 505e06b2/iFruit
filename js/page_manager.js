location.hash = "#loading";

async function PageManager() {
	//public
	this.change = (page_name) => {
		location.hash = "#" + page_name;
	}

	//private
	window.onhashchange = () => {
		const goto = location.hash.slice(1);
		if(goto === "loading") { //this is if encountered after loading
			history.back();
			return;
		}
		document.body.innerHTML = "";
		document.body.appendChild(_page_dict[goto]);
	}

	async function loadPage(name) {
		const async_type = Object.getPrototypeOf(async function(){}).constructor;
		const js_script = await(await fetch(`pages/${name}.js`)).text();
		return await async_type(js_script)(_utils);
	}

	let _utils = null; //loadPage needs utils lol
	_utils = await loadPage("utils");

	const _page_dict = {
		"home": await loadPage("home"),
		"drawer": await loadPage("drawer"),
		"timer": await loadPage("timer")
	};

	return this;
}
