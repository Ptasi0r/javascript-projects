const main = document.querySelector('.main-container');
const addUserBtn = document.querySelector('.add-user');
const doubleBtn = document.querySelector('.double');
const showMillionairesBtn = document.querySelector('.show-millionaires');
const sortBtn = document.querySelector('.sort');
const calculateWealthBtn = document.querySelector('.calculate-wealth');

let data = [];

// Fetch random user and add money
const getRandomUser = async () => {
  const result = await fetch('https://randomuser.me/api/');
  const data = await result.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
};

// Double eveyones money
const doubleMoney = () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
};

// Sort users by richest
const sortByRichest = () => {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
};

// Filter only millionaires
const showMillionaires = () => {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
};

// Calculate the total wealth
const calculateWealth = () => {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);
};

// Add new obj to data arr
const addData = (user) => {
  data.push(user);
  updateDOM();
};

// Update DOM
const updateDOM = (providedData = data) => {
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach((el) => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${el.name}</strong> ${formatMoney(el.money)}`;
    main.appendChild(element);
  });
};

// Format number as money
const formatMoney = (money) => {
  return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

getRandomUser();
getRandomUser();
getRandomUser();
