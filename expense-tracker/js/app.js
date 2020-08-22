const balace = document.querySelector('.balance');
const moneyPlus = document.querySelector('.money-plus');
const moneyMinus = document.querySelector('.money-minus');
const list = document.querySelector('.list');
const form = document.querySelector('.form');
const text = document.querySelector('.text');
const amount = document.querySelector('.amount');

const dummyTransations = [
  {
    id: 1,
    text: 'Flower',
    amount: -20,
  },
  {
    id: 2,
    text: 'Floweeeeer',
    amount: 200,
  },
  {
    id: 3,
    text: 'Flowwwer',
    amount: -56.25,
  },
];

const localStorageTransations = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransations : [];

// Add transaction
const addTrasaction = (e) => {
  e.preventDefault();

  if (text.value.trim() == '' || amount.value.trim() == '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };

    console.log(transaction);
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
};

// Generate random ID
const generateId = () => {
  return Math.floor(Math.random() * 1000000000);
};

// Add transactions to DOM list
const addTransactionDOM = (transaction) => {
  const sign = transaction.amount < 0 ? '-' : '+';
  const item = document.createElement('li');

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  item.innerHTML = `
  ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  list.appendChild(item);
};

// Update the balance, income and expense
const updateValues = () => {
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

  // console.log(expense);

  balace.innerText = `$${total}`;
  moneyPlus.innerText = `$${income}`;
  moneyMinus.innerText = `$${expense}`;
};

// Remove transaction by ID
const removeTransaction = (id) => {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
};

// Update local storage transactions
const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

// Init app
const init = () => {
  list.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
};

init();

form.addEventListener('submit', addTrasaction);
