//this is ran like an async function and does not spew into window.*

const _utils = arguments[0];
const page_manager = arguments[1];

function Timer(obj) {
	const getFutureDate = () => {
		return +(new Date((new Date()).getTime() + values.length*120000)); //+ -> to int
	};

	const values = {};
	//essential
	values.length = obj.length;
	//non-essential
	values.id = (obj.id) ? obj.id : page_manager.persistence.timer_id++;
	values.name = (obj.name) ? obj.name : "Timer " + values.id;
	values.persist = (obj.persist) ? obj.persist : false;
	values.future_date = (obj.future_date) ? obj.future_date : getFutureDate();

	page_manager.persistence.timers[values.id] = values; //this is now a permanent reference, so you can just edit values.*

	let name_elem;
	let value_elem;
	let persist_elem;
	const elem = _utils.createElement("div", {
		class: "timer",
		contents: [
			_utils.createElement("i", {
				class: "ri-close-circle-line",
				title: "Delete",
				onclick: () => {if(window.confirm(`Are you sure you want to delete "${values.name}"?`)) this.delete()}
			}),
			persist_elem = _utils.createElement("i", {
				class: (values.persist) ? "ri-lock-fill" : "ri-lock-unlock-fill",
				title: "Toggle persistence",
				onclick: () => {
					if(window.confirm(`Are you sure you want to toggle the persistence of "${values.name}"?\nIf locked, and the timer reaches 00:00, it will remain in the Timer section`)) {
						values.persist = !values.persist;
						persist_elem.className = (values.persist) ? "ri-lock-fill" : "ri-lock-unlock-fill";
					}
				}
			}),
			name_elem = _utils.createElement("span", {
				class: "name",
				contents: values.name,
				title: "Change name",
				onclick: () => {
					const new_name = window.prompt(`New name for "${values.name}"`);
					if(new_name) {
						values.name = new_name;
						name_elem.innerHTML = values.name;
					}
				}
			}),
			value_elem = _utils.createElement("span", {
				contents: _utils.timeDeltaToGTADuration(values.length * 120000), //default to length of time
				onclick: () => {
					if(window.confirm(`Are you sure you want to reset "${values.name}"?`)) {
						values.future_date = getFutureDate();
					}
				}
			})
		]
	});

	this.delete = () => {
		clearInterval(updateLoop);
		delete page_manager.persistence.timers[values.id];
		elem.remove();
		delete elem;
		if(page_manager.home_timers.childElementCount <= 1) {
			page_manager.home_timers.style.display = "";
		}
	};

	const updateLoop = setInterval(() => {
		let delta = values.future_date - (new Date());
		if(delta < 0) {
			delta = 0; //so persistent looks okay
			if(!values.persist) this.delete();
		}
		value_elem.innerHTML = _utils.timeDeltaToGTADuration(delta);
	}, 500);

	page_manager.home_timers.style.display = "block";
	page_manager.home_timers.appendChild(elem);
}

if(page_manager.persistence.timer_id === undefined) page_manager.persistence.timer_id = 1;
if(page_manager.persistence.timers === undefined) page_manager.persistence.timers = {};
for(const [key, value] of Object.entries(page_manager.persistence.timers)) {
	new Timer(value);
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
			const gta_hours = parseInt(number.value);
			if(isNaN(gta_hours) || gta_hours <= 0) return;
			new Timer({
				name: name.value,
				length: gta_hours
			});

			history.go(-2);
			name.value = "";
			number.value = "5"; //check it's the same as above
		}
	})
]);
