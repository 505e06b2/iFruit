//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];

let id = 1;

function msToGTAHrMin(ms) {
	const gta_mins = ms / 2000;
	const hrs = Math.floor(gta_mins / 60).toString().padStart(2, "0");
	const mins = Math.floor(gta_mins % 60).toString().padStart(2, "0");
	return `${hrs}:${mins}`;
}

function createTimer(int_str, name) {
	if(!name) name = "Timer " + (id++);
	let content;
	let name_elem;

	const gta_hours = parseInt(int_str);
	if(isNaN(gta_hours) || gta_hours <= 0) return;
	const future_time = new Date((new Date()).getTime() + gta_hours*2*60000);
	const elem = _utils.createElement("div", {
		class: "timer",
		contents: [
			_utils.createElement("img", {
				src: "icons/remixicon-close-circle-line.svg",
				onclick: () => {if(window.confirm(`Are you sure you want to delete "${name}"?`)) removeTimer()}
			}),
			name_elem = _utils.createElement("span", {
				class: "name",
				contents: name,
				onclick: () => {
					const new_name = window.prompt(`New name for "${name}"`);
					if(new_name) {
						name = new_name;
						name_elem.innerHTML = name;
					}
				}
			}),
			content = _utils.createElement("span", {
				contents: msToGTAHrMin(future_time.getTime() - (new Date()).getTime()),
				onclick: () => {
					if(window.confirm(`Are you sure you want to reset "${name}"?`)) {
						removeTimer();
						createTimer(int_str, name);
					}
				}
			})
		]
	});

	const removeTimer = () => {
		elem.remove();
		delete elem;
		if(window.home_timers.childElementCount <= 1) {
			window.home_timers.style.display = "";
			window.onbeforeunload = null; //remove - are you sure you want to leave?
		}
	};

	const interval = setInterval(() => {
		const delta = future_time.getTime() - (new Date()).getTime();
		if(delta < 0) {
			clearInterval(interval);
			removeTimer();
			return;
		}
		content.innerHTML = msToGTAHrMin(delta);
	}, 500);


	window.onbeforeunload = () => true; //are you sure you want to leave?
	window.home_timers.style.display = "block";
	window.home_timers.appendChild(elem);
	history.back();
	history.back();
}

let name;
let number;

return _utils.createPage("timer", [
	_utils.createAppHeader("Timer"), //back button
	name = _utils.createElement("input", { type: "text", placeholder: "Name" }),
	_utils.createElement("div", {
		class: "gtatime",
		contents: number = _utils.createElement("input", { type: "number", min: "1", step: "1", value: "5" }),
	}),
	_utils.createElement("button", {
		contents: "Create Timer",
		onclick: () => createTimer(number.value, name.value)
	})
]);
