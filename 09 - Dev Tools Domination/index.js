const dogs = [
	{ name: "Snickers", age: 2 },
	{ name: "hugo", age: 8 },
];

function makeGreen() {
	const p = document.querySelector("p");

	if (p.style.fontSize > "20px") {
		p.style.color = "black";
		p.style.fontSize = "16px";
	} else {
		p.style.color = "#BADA55";
		p.style.fontSize = "50px";
	}
}

// Regular
console.log("hello");

// Interpolated %s or ES6 `${}`
let s = "test 1 and 2";
console.log("hello %s test2", "test1");
console.log(`hello ${s}`);

// Styled %c
console.log("%c big purple text", "color:purple;font-size:20px");

// warning!
console.warn("warning");

// Error :|
console.error("error");

// Info (2/29/20 not showing the i icon)
console.info("fun fact info");

// Testing
// will only show if something is false
console.assert(1 === 1, "that is true so won't show");
console.assert(1 === 2, "that is false so will show");
const p = document.querySelector("p");
console.assert(p.classList.contains("ouch"), "that is wrong");

// clearing
// console.clear();

// Viewing DOM Elements
console.log(p); // only shows the element html
console.dir(p); // shows all info about p

// Grouping together
dogs.forEach(dog => {
	// console.group(`${dog.age}`);
	console.groupCollapsed(`${dog.age}`);
	console.log(`This is ${dog.name}`);
	console.log(`${dog.name} is ${dog.age} years old`);
	console.log(`${dog.name} is ${dog.age * 7} dog years old`);
	console.groupEnd(`${dog.age}`);
});

// counting
console.count("cree");
console.count("P");
console.count("cree");
console.count("P");
console.count("cree");

// timing - start a timer to see how long something takes
console.time("fetching data");
fetch("https://api.github.com/users/wesbos")
	.then(data => data.json())
	.then(data => {
		console.timeEnd("fetching data");
		console.log(data);
	});

// table
console.table(dogs);
