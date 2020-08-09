const main = document.querySelector('main');
const voicesSelect = document.querySelector('.voices');
const textArea = document.querySelector('.text');
const readBtn = document.querySelector('.read');
const toggleBtn = document.querySelector('.toggle');
const closeBtn = document.querySelector('.close');
const closeCustomBtn = document.querySelector('.close-custom');
const searchPhotoBtn = document.querySelector('.search-photo');
const keywords = document.querySelector('.keywords');
const unsplashRespondContainer = document.querySelector('.unsplash-respond');
const saveCardBtn = document.querySelector('.save-card');
const cardName = document.querySelector('.card-name');

const data = [
  {
    image: 'img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: 'img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: 'img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: 'img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: 'img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: 'img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: 'img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: 'img/sleepy.jpg',
    text: "I'm Sleepy",
  },
  {
    image: 'img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: 'img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: 'img/school.jpg',
    text: 'I Want To Go To School',
  },
];

// Store vocies
let vocies = [];

//Init speech synth
const message = new SpeechSynthesisUtterance();

// Create speech boxes
const createBox = (item) => {
  const box = document.createElement('div');
  const { image, text } = item;

  box.classList.add('box');
  box.innerHTML = `
    <img src="${image}" alt="${text} - Image from unsplash.com"/>
    <p class="info">${text}</p>
  `;

  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();

    //Add active effec
    box.classList.add('active');

    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
};

// Set text
const setTextMessage = (text) => {
  message.text = text;
};

// Speak text
const speakText = () => {
  speechSynthesis.speak(message);
};

// Get voices
const getVoices = () => {
  vocies = speechSynthesis.getVoices();

  vocies.forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;

    voicesSelect.appendChild(option);
  });
};

// Set voice
const setVoice = (e) => {
  message.voice = vocies.find((voice) => voice.name === e.target.value);
};

// Get photos from Unsplash API
const searchPhoto = async () => {
  const respond = await fetch(`https://api.unsplash.com/search/photos?client_id=dvmtDRIQDHcK-c_jjUGwZ9wOTwaHciEJHpztNIcbCDQ&query=${keywords.value.trim().replace(' ', '%20')}&per_page=10`);
  const data = await respond.json();
  const photos = data.results;
  console.log(photos);
  unsplashRespondContainer.innerHTML = '';
  photos.forEach((photo) => {
    const el = document.createElement('div');
    el.classList.add('photo');
    el.innerHTML = `
      <img src="${photo.urls.small}" alt="Photo from Unsplash: ${photo.user.name}"/>
    `;
    el.addEventListener('click', () => {
      const photos = unsplashRespondContainer.querySelectorAll('.photo');
      photos.forEach((el) => el.classList.remove('selected'));
      console.log('a');
      el.classList.add('selected');
    });
    unsplashRespondContainer.appendChild(el);
    unsplashRespondContainer.classList.add('show');
  });
};

//Check if fileds are fill
const checkRequired = () => {
  const image = document.querySelector('.photo.selected');
  if (!cardName.value.trim() || image === null) {
    alert('Card Name and Photo is required');
    return false;
  }

  return true;
};

//Save custom card to LocalStorage
const saveCard = () => {
  const currentCards = localStorage.getItem('speechReader') !== null ? localStorage.getItem('speechReader') : null;
  const image = document.querySelector('.photo.selected');
  if (currentCards !== null) {
    if (checkRequired()) {
      const data = JSON.parse(currentCards);
      data.push({
        text: cardName.value.trim(),
        image: image.querySelector('img').getAttribute('src'),
      });
      localStorage.setItem('speechReader', JSON.stringify(data));
    }
  } else {
    if (checkRequired()) {
      const speechReader = [
        {
          text: cardName.value.trim(),
          image: image.querySelector('img').getAttribute('src'),
        },
      ];
      localStorage.setItem('speechReader', JSON.stringify(speechReader));
    }
  }
  window.location.reload();
};

const initialize = () => {
  //Create box for default data
  data.forEach(createBox);

  // Load data from LocalStorage
  const userCards = localStorage.getItem('speechReader') !== null ? JSON.parse(localStorage.getItem('speechReader')) : null;
  if (userCards) {
    userCards.forEach(createBox);
  }

  //Add button to dom
  const box = document.createElement('div');
  box.classList.add('box');
  box.classList.add('button-box');
  box.innerHTML = `
    <img src="img/custom.jpg" alt="Image from unsplash.com"/>
    <p class="info">ADD YOUR CUSTOM CARD</p>
  `;
  box.addEventListener('click', () => document.querySelector('.custom-box').classList.toggle('show'));
  main.appendChild(box);

  // Append voices to DOM
  getVoices();
};

// Initialize website
initialize();

// Voices changed

speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () => document.querySelector('.text-box').classList.toggle('show'));

// Close text box
closeBtn.addEventListener('click', () => document.querySelector('.text-box').classList.remove('show'));

// Close custom card box
closeCustomBtn.addEventListener('click', () => {
  unsplashRespondContainer.classList.remove('show');
  document.querySelector('.custom-box').classList.remove('show');
});

//Change voice
voicesSelect.addEventListener('change', setVoice);

// Get data from unsplash
searchPhotoBtn.addEventListener('click', searchPhoto);

// Save custom card to LocalStorage
saveCardBtn.addEventListener('click', saveCard);

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textArea.value);
  speakText();
});
