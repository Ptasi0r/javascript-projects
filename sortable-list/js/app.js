const draggableList = document.querySelector('.draggable-list');
const checkBtn = document.querySelector('.check-btn');

const richestPeople = ['Jeff Bezos', 'Bill Gates', 'Warren Buffett', 'Bernard Arnault', 'Carlos Slim Helu', 'Amancio Ortega', 'Larry Ellison', 'Mark Zuckerberg', 'Michael Bloomberg', 'Larry Page'];

// Store list items
const listItems = [];

let dragStartIndex;

// Insert list items into DOM
const createList = () => {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <div class="img-container">
          <img src="img/${person.toLowerCase().split(' ').join('-')}.jpg">
        </div>
        <p class="person-name">${person}</p>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.375 11.25H0.625C0.28125 11.25 0 11.5312 0 11.875V13.125C0 13.4688 0.28125 13.75 0.625 13.75H19.375C19.7188 13.75 20 13.4688 20 13.125V11.875C20 11.5312 19.7188 11.25 19.375 11.25ZM19.375 6.25H0.625C0.28125 6.25 0 6.53125 0 6.875V8.125C0 8.46875 0.28125 8.75 0.625 8.75H19.375C19.7188 8.75 20 8.46875 20 8.125V6.875C20 6.53125 19.7188 6.25 19.375 6.25Z" fill="black"/>
        </svg>
      </div>
    `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });

  addEventListeners();
};

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragEnter() {
  this.classList.add('over');
}
function dragLeave() {
  this.classList.remove('over');
}
function dragOver(e) {
  e.preventDefault();
}
function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

// Swap list items that are drag and drop
const swapItems = (fromIndex, toIndex) => {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
};

// Check the order of list items
const checkOrder = () => {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();
    if (personName !== richestPeople[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
};

const addEventListeners = () => {
  const draggables = document.querySelectorAll('.draggable');
  const draggableListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  draggableListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
};

createList();

checkBtn.addEventListener('click', checkOrder);
