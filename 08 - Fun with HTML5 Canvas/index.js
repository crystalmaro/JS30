const canvas = document.querySelector("#draw");
// 1. you draw on context ctx (either 2d or 3d)
const ctx = canvas.getContext("2d");
// 2. size up canvas to be exact width with window
canvas.width = window.innerWidth / 1.5;
canvas.height = window.innerHeight / 1.5;
ctx.strokeStyle = "black";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 5;
// ctx.globalCompositeOperation = "multiply"; // blend overlap colors

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
	if (!isDrawing) return;
	console.log(e);
	// ctx.strokeStyle = `hsl(${hue},100%, 50%)`;
	ctx.beginPath(); // starting point
	ctx.moveTo(lastX, lastY); // start from
	ctx.lineTo(e.offsetX, e.offsetY); // go to
	ctx.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY]; // ES6, destructuring array (re-assigning variable)

	// hue++;
	// if (hue >= 360) hue = 0;

	// if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
	// 	direction = !direction;
	// }
	// if (direction) {
	// 	ctx.lineWidth++;
	// } else {
	// 	ctx.lineWidth--;
	// }
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", e => {
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

document.getElementById("color").onchange = function() {
	ctx.strokeStyle = this.value;
};

document.getElementById("size").onchange = function() {
	ctx.lineWidth = this.value;
};

// const myCanvas = document.getElementById("canvas");

// const updateCanvas = () => ({
// 	width: window.innerWidth,
// 	height: window.innerHeight,
// });

// updateCanvas();
// window.addEventListener("resize", updateCanvas());
