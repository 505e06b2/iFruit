return new (function() {
	this.createPage = (name, content) => {
		const ret = document.createElement("div");
		ret.setAttribute("name", name);
		ret.className = "page";
		if(content) for(const x of content) ret.appendChild(x);
		return ret;
	};

	this.createHeaderFooter = (prefix, content) => {
		const ret = document.createElement("div");
		ret.className = prefix + "_spacing";
		const contents = document.createElement("div");
		contents.className = prefix;
		if(content) contents.appendChild(content);
		ret.appendChild(contents);
		return ret;
	};

	this.createAppHeader = (title) => { //Go back
		const ret = document.createElement("div");
		ret.className = "header_spacing";
		const contents = document.createElement("div");
		contents.className = "header";
		contents.appendChild(
			this.createElement("img", {
				id: "back_icon",
				src: "icons/remixicon-arrow-left-circle-line.svg",
				onclick: () => page.change("home")
			})
		);
		contents.appendChild(
			this.createElement("span", {class: "app_title", contents: title})
		);
		ret.appendChild(contents);
		return ret;
	};

	this.createSectionHeader = (name) => {
		const ret = document.createElement("div");
		ret.className = "section_title";
		ret.innerText = name;
		return ret;
	};

	this.createSection = (name, content) => {
		const ret = document.createElement("div");
		ret.className = "section";
		const section_title = document.createElement("div");
		section_title.className = "section_title";
		section_title.innerText = name;
		ret.appendChild(section_title);
		if(content) for(const x of content) ret.appendChild(x);
		return ret;
	};

	this.createAppButton = (name, icon, onclick) => {
		const ret = document.createElement("span");
		ret.className = "app_icon";
		ret.style.backgroundImage = `url("${icon}")`;
		const text = document.createElement("span");
		text.className = "app_text";
		text.innerHTML = name;
		ret.appendChild(text);
		ret.onclick = onclick;
		return ret;
	};

	this.createElement = (tag, opts) => {
		const ret = document.createElement(tag);
		for(const [key, value] of Object.entries(opts)) {
			switch(key) {
				case "class":
					ret.className = value;
					break;

				case "contents":
					if(Array.isArray(value)) { //Array of DOM Nodes
						for(const x of value) ret.appendChild(x);
					} else if(typeof(value) === "string") {
						ret.innerHTML = value;
					} else {
						ret.appendChild(value); //DOM Node
					}
					break;

				default:
					ret[key] = value;
					break;

			}
		}
		return ret;
	}
})();
