location.hash = "#loading";

async function PageManager() {
	//public
	this.change = (page_name) => {
		location.hash = "#" + page_name;
	}

	this.persistence = (() => {
		try {
			const parsed = JSON.parse(window.localStorage.persistence);
			if(typeof(parsed) === "object") return parsed;
		} catch {}
		return {};
	})();

	//private
	const self = this;
	const contents_container = document.querySelector('#contents-container');
	window.onhashchange = () => {
		const goto = location.hash.slice(1);
		if(goto === "loading") { //this is if encountered after loading
			history.go(-history.length-1);
			return;
		}
		contents_container.innerHTML = "";
		contents_container.appendChild(_page_dict[goto]);
	};

	window.onbeforeunload = () => {
		window.localStorage.persistence = JSON.stringify(self.persistence);
	};

	async function loadPage(name) {
		const async_type = Object.getPrototypeOf(async function(){}).constructor;
		const js_script = await(await fetch(`pages/${name}.js`)).text();
		return await async_type(js_script)(_utils, self);
	}

	let _utils = null; //loadPage needs utils lol
	_utils = await loadPage("utils");

	async function loadAll(name_arr) {
		const load_dict = {}
		for(const x of name_arr) load_dict[x] = loadPage(x);
		const ret = {};
		for(const x of name_arr) ret[x] = await load_dict[x];
		return ret;
	}

	const _page_dict = await loadAll(["home", "drawer", "timer", "settings"]);

	return this;
}
