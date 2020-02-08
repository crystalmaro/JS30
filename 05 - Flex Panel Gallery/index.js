const panels = [...document.querySelectorAll(".panel")];

function toggleOpen() {
	this.classList.toggle("open");
}

function toggleActive(e) {
	// below shows what transitions are finished
	// transition is defined in css for .panel
	console.log(e.propertyName);
	if (e.propertyName.includes("flex")) {
		this.classList.toggle("open-active");
	}
}

panels.map(panel => panel.addEventListener("click", toggleOpen));
panels.map(panel => panel.addEventListener("transitionend", toggleActive));
