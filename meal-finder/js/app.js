const search = document.querySelector('.meal-name');
const submit = document.querySelector('.search-btn');
const random = document.querySelector('.random');
const mealsEl = document.querySelector('.meals');
const resultHeading = document.querySelector('.result-heading');
const singleMealEl = document.querySelector('.single-meal-container');
const placeholderText = document.querySelector('.placeholder-text');

// Search meal and fetch from API
const searchMeal = async () => {
  singleMealEl.innerHTML = '';

  const searchTerm = search.value;

  if (searchTerm.trim()) {
    placeholderText.style.display = 'none';
    const respond = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await respond.json();
    console.log(data);

    if (data.meals === null) {
      placeholderText.innerText = 'There is no search results. Try again';
      placeholderText.style.display = 'block';
    } else {
      mealsEl.style.display = 'grid';
      resultHeading.innerHTML = `<h2>Search results for '${searchTerm}':</h2>`;
      mealsEl.innerHTML = data.meals
        .map(
          (meal) => `
        <div class="meal">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
          <div class="meal-info" data-mealID=${meal.idMeal}>
            <h3>${meal.strMeal}</h3>
          </div>
        </div>`
        )
        .join('');
      search.value = '';
    }
  } else {
    placeholderText.innerText = 'INSERT MEAL NAME FIRST';
    placeholderText.style.display = 'block';
    alert('Please enter a search term');
  }
};

// Fetch random meal from API
const randomMeal = async () => {
  mealsEl.innerHTML = '';
  mealsEl.style.display = 'none';
  resultHeading.innerHTML = '';
  const respond = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await respond.json();
  const meal = data.meals[0];
  placeholderText.style.display = 'none';
  addMealToDOM(meal);
};

// Fetch meal by ID
const getMealByID = async (mealID) => {
  const respond = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  const data = await respond.json();
  const meal = data.meals[0];
  addMealToDOM(meal);
};

// Add meal to DOM
const addMealToDOM = (meal) => {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
      break;
    }
  }
  console.log(ingredients);

  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h2>${meal.strMeal}</h2>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="single-meal-info">
        Category: 
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <h3>How to prepare?</h3>
        <ol>${getListOfInstructions(meal.strInstructions)}</ol>
        <h3>Ingredients:</h3>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
  if (singleMealEl.offsetTop > 500) {
    window.scrollTo({
      top: singleMealEl.offsetTop,
      behavior: 'smooth',
    });
  }
};

const getListOfInstructions = (string) => {
  const list = (string + ' ').split('.');

  const listOfLi = list
    .map((el) => {
      if (el != ' ') {
        return `<li> ${el}.</li>`;
      }
    })
    .join('');

  return listOfLi;
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  searchMeal();
});

random.addEventListener('click', randomMeal);

mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.dataset.mealid;
    getMealByID(mealID);
  }
});
