const inputs = document.querySelectorAll('.controls .item input')
const inputsArray = Array.from(inputs)
// querySelector returns a NodeList, looks like an array but not an array
// array has methods such as map, reduce, filter (prototypes of array)
// prototypes of NodeList don't have the above

// NodeLists are actually not a JavaScript API, but a browser API.
// Things like querySelectorAll() and getElementsByTagName() aren’t JavaScript methods,
// they’re browser APIs that let you access DOM elements,
// you can then manipulate them with JavaScript

function handleUpdate() {
    // console.log(this.value)
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value+suffix)
}

// inputs.forEach(x => x.addEventListener('change', handleUpdate))
inputsArray.map(x => x.addEventListener('change', handleUpdate))
inputsArray.map(x => x.addEventListener('mousemove', handleUpdate))