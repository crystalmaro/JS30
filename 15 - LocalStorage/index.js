const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
const checkAll = document.querySelector('#check-all')

function addItem(e) {
  e.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text: text,
    done: false
  }
  items.push(item)
  populateList(items, itemsList)
  localStorage.setItem('items', JSON.stringify(items));
  this.reset()
}

// when passing in an empty array for the param,
// if forget to pass in something, 
// it'd just loop over, it wouldn't break the code
function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate,i)=> {
    return `
      <li>
        <input type="checkbox" 
          data-index=${i} 
          id="item${i}" 
          ${plate.done ? 'checked' : ''}/>
        <label for="item${i}">${plate.text}</label>
      </li>
    `;
  }).join('');
}

function toggleDone(e) {
  if (!e.target.matches('input')) return;
  console.log(e.target)
  const el = e.target;
  const index = el.dataset.index
  items[index].done = !items[index].done
  localStorage.setItem('items', JSON.stringify(items))
}

function checkAllInput() {
  items.forEach(item => item.done = !item.done)
  localStorage.setItem('items', JSON.stringify(items))
  populateList(items, itemsList)
}

addItems.addEventListener('submit', addItem)
itemsList.addEventListener('click', toggleDone)
checkAll.addEventListener('click', checkAllInput)

populateList(items, itemsList);