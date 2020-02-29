// create dynamic content
let inbox = document.createElement("div");
inbox.classList = "inbox";
document.body.appendChild(inbox);

let items = ["one", "two", "three", "four", "five"];

items.forEach(item => {
	let div = document.createElement("div");
	div.classList = "item";

	let input = document.createElement("input");
	input.setAttribute("type", "checkbox");
	div.appendChild(input);

	let p = document.createElement("p");
	p.innerHTML = item;
	div.appendChild(p);

	inbox.appendChild(div);
});

// shift to select all logic
const checkboxes = document.querySelectorAll("input[type='checkbox']");
let lastChecked;

function handleCheck(e) {
	let inBetween = false;
	// check if shift key is down
	// AND check if lastChecked isn't unchecked
	if (e.shiftKey && this.checked) {
		// loop over every checkbox
		checkboxes.forEach(checkbox => {
			// this: the one clicks secondly
			// lastChecked: the first one checked
			if (checkbox === this || checkbox === lastChecked) {
				inBetween = !inBetween;
			}
			if (inBetween) {
				checkbox.checked = true;
			}
		});
	}
	lastChecked = this;
}

checkboxes.forEach(checkbox =>
	// click event fires on keyboard too
	checkbox.addEventListener("click", handleCheck)
);
