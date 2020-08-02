const currencyElOne = document.querySelector('.currency-one');
const currencyElTwo = document.querySelector('.currency-two');
const amountElOne = document.querySelector('.amount-one');
const amountElTwo = document.querySelector('.amount-two');
const rateEl = document.querySelector('.rate');
const dateEl = document.querySelector('.date');
const swapBtn = document.querySelector('.swap');

const calculate = async () => {
  const currencyOne = currencyElOne.value;
  const currencyTwo = currencyElTwo.value;
  const respond = await fetch(`https://api.exchangeratesapi.io/latest?base=${currencyOne}`);
  const data = await respond.json();
  const exchangeRate = data['rates'][currencyTwo];
  console.log(data['rates']);
  rateEl.textContent = `1 ${currencyOne} = ${exchangeRate} ${currencyTwo}`;
  amountElTwo.value = (amountElOne.value * exchangeRate).toFixed(2);
  dateEl.textContent = data.date;
};

currencyElOne.addEventListener('change', calculate);
currencyElTwo.addEventListener('change', calculate);
amountElOne.addEventListener('input', calculate);
amountElTwo.addEventListener('input', calculate);
swapBtn.addEventListener('click', () => {
  const temp = currencyElOne.value;
  currencyElOne.value = currencyElTwo.value;
  currencyElTwo.value = temp;
  calculate();
});

calculate();
