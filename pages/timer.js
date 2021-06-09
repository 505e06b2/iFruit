//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];
const page_manager = arguments[1];

function msToGTAHrMin(ms) {
	const gta_mins = ms / 2000;
	const hrs = Math.floor(gta_mins / 60).toString().padStart(2, "0");
	const mins = Math.floor(gta_mins % 60).toString().padStart(2, "0");
	return `${hrs}:${mins}`;
}

function createTimer(future_time, name, dont_go_back) {
	if(!name) name = "Timer " + (page_manager.persistence.timer_id++);
	let content;
	let name_elem;

	page_manager.persistence.timers[name] = future_time.getTime();

	const elem = _utils.createElement("div", {
		class: "timer",
		name: name,
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
						delete page_manager.persistence.timers[name];
						name = new_name;
						page_manager.persistence.timers[name] = future_time.getTime();
						name_elem.innerHTML = name;
					}
				}
			}),
			content = _utils.createElement("span", {
				contents: msToGTAHrMin(future_time.getTime() - (new Date()).getTime()),
				onclick: () => {
					if(window.confirm(`Are you sure you want to reset "${name}"?`)) {
						removeTimer();
						createTimer(int_str, name, true);
					}
				}
			})
		]
	});

	const removeTimer = () => {
		delete page_manager.persistence.timers[name];
		elem.remove();
		delete elem;
		if(window.home_timers.childElementCount <= 1) {
			window.home_timers.style.display = "";
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

	window.home_timers.style.display = "block";
	window.home_timers.appendChild(elem);
	if(dont_go_back) return;
	history.back();
	history.back();
}

if(page_manager.persistence.timer_id === undefined) page_manager.persistence.timer_id = 1;
if(page_manager.persistence.timers === undefined) page_manager.persistence.timers = {};
for(const [key, value] of Object.entries(page_manager.persistence.timers)) {
	createTimer(new Date(value), key, true);
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
		onclick: () => {
			if(window.home_timers.querySelector(`[name="${name.value}"]`)) {
				alert(`A timer with the name "${name.value}" already exists!`);
				return;
			}
			const gta_hours = parseInt(number.value);
			if(isNaN(gta_hours) || gta_hours <= 0) return;
			const future_time = new Date((new Date()).getTime() + gta_hours*2*60000);

			createTimer(future_time, name.value);
			name.value = "";
			number.value = "5"; //check it's the same as above
		}
	})
]);
