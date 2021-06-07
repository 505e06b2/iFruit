async function PageManager() {
	//public
	this.change = (page_name, dont_save_state) => {
		if(!dont_save_state) {
			let current_page = "home";
			try {
				current_page = document.querySelector('.page').getAttribute("name");
			} catch {}
			history.pushState({page: page_name}, page_name);
		}
		document.body.innerHTML = "";
		document.body.appendChild(_page_dict[page_name]);
	}

	//private
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
