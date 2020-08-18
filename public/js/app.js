const projectsContainer = document.querySelector('.projects-list-container');

const tags = {
  localstorage: {
    name: 'LocalStorage',
    svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 6C20 3.832 16.337 2 12 2C7.663 2 4 3.832 4 6V8C4 10.168 7.663 12 12 12C16.337 12 20 10.168 20 8V6ZM12 19C7.663 19 4 17.168 4 15V18C4 20.168 7.663 22 12 22C16.337 22 20 20.168 20 18V15C20 17.168 16.337 19 12 19Z" fill="black"/><path d="M20 10C20 12.168 16.337 14 12 14C7.663 14 4 12.168 4 10V13C4 15.168 7.663 17 12 17C16.337 17 20 15.168 20 13V10Z" fill="black" /></svg>',
  },
  ui: {
    name: 'UI Change',
    svg:
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.332 8.668C16.1982 8.64201 17.0203 8.27961 17.6239 7.65767C18.2274 7.03573 18.565 6.20316 18.565 5.3365C18.565 4.46985 18.2274 3.63728 17.6239 3.01534C17.0203 2.3934 16.1982 2.031 15.332 2.005H8.66797C7.80171 2.031 6.97963 2.3934 6.37608 3.01534C5.77252 3.63728 5.43495 4.46985 5.43495 5.3365C5.43495 6.20316 5.77252 7.03573 6.37608 7.65767C6.97963 8.27961 7.80171 8.64201 8.66797 8.668C7.79413 8.68314 6.9612 9.0409 6.34859 9.66422C5.73598 10.2875 5.3927 11.1265 5.3927 12.0005C5.3927 12.8745 5.73598 13.7135 6.34859 14.3368C6.9612 14.9601 7.79413 15.3179 8.66797 15.333C7.7984 15.3543 6.97162 15.7147 6.36413 16.3373C5.75665 16.9598 5.41661 17.7952 5.41661 18.665C5.41661 19.5348 5.75665 20.3702 6.36413 20.9927C6.97162 21.6153 7.7984 21.9757 8.66797 21.997C9.55168 21.9965 10.399 21.6451 11.0238 21.0201C11.6486 20.3952 11.9997 19.5477 12 18.664V8.668H15.332Z" fill="black"/><path d="M15.332 15.332C17.1722 15.332 18.664 13.8402 18.664 12C18.664 10.1598 17.1722 8.668 15.332 8.668C13.4918 8.668 12 10.1598 12 12C12 13.8402 13.4918 15.332 15.332 15.332Z" fill="black"/></svg>',
  },
  video: {
    name: 'HTML5 Video API',
    svg:
      '<svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 0V20H26V0H0ZM3.18812 3.24196H22.8119V16.7581H3.18812V3.24196ZM10.0833 5.5952V14.5985L17.7417 10.0839L10.0833 5.5952V5.5952Z" fill="black" /> </svg>',
  },
  volume: {
    name: 'Volume Control',
    svg:
      ' <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M15.0012 9C15.0012 6.50391 13.4754 4.36641 11.3098 3.46289L10.7332 4.84805C12.3574 5.52656 13.5 7.12969 13.5 9C13.5 10.8738 12.3574 12.4734 10.7297 13.152L11.3063 14.5371C13.4754 13.6336 15.0012 11.4961 15.0012 9ZM11.9988 9C11.9988 7.75195 11.2359 6.6832 10.1531 6.2332L9.57656 7.61836C10.118 7.84336 10.4977 8.37773 10.4977 9.00352C10.4977 9.62578 10.118 10.1602 9.57656 10.3887L10.1531 11.7738C11.2359 11.3168 11.9988 10.248 11.9988 9V9ZM12.4629 0.692578L11.8828 2.07773C14.5934 3.20625 16.4988 5.87812 16.4988 9C16.4988 12.1184 14.5934 14.7937 11.8828 15.9223L12.4594 17.3074C15.7148 15.9504 18 12.7441 18 9C18 5.25586 15.7148 2.04961 12.4629 0.692578V0.692578ZM0 5.24883V12.7477H2.99883L8.25117 18V0L2.99883 5.24883H0Z" fill="black" /></svg>',
  },
  temp: {
    name: '',
    svg: '',
  },
};
// https://www.textfixer.com/tools/remove-line-breaks.php
const projects = [
  {
    path: 'custom-video-player',
    header: 'Custom <span>Video Player</span>',
    photos: [
      { id: 1, title: 'Test', path: 'custom-video-player' },
      { id: 2, title: 'Test', path: 'custom-video-player' },
    ],
    tags: ['localstorage', 'video', 'volume'],
  },
  {
    path: 'exchange-rate-calculator',
    header: '<span>Exchange Rate</span> Calculator',
    photos: [
      { id: 1, title: 'Test', path: 'exchange-rate-calculator' },
      { id: 2, title: 'Test', path: 'exchange-rate-calculator' },
    ],
    tags: [],
  },
];

// Initalize website with DOM elements

const init = () => {
  // Add all projects to DOM
  projects.forEach((project, index) => {
    const el = document.createElement('section');
    el.classList = `${index % 2 ? 'project left' : 'project'}`;

    const elPhotos = project.photos.map((photo) => `<li class="splide__slide"><img src="public/img/${photo.path}/${photo.id}.png" alt="${photo.title}" /></li>`).join('');
    const elTags = project.tags.map((tag) => `<div class="tag">${tags[tag].svg} ${tags[tag].name}</div>`).join('');

    el.innerHTML = ` 
      <div class="slider">
        <div id="splide" class="splide">
          <div class="splide__track">
            <ul class="splide__list">
              ${elPhotos}
            </ul>
          </div>
        </div>
        <span class="box bottom"></span>
        <span class="box top"></span>
      </div>
      <section class="project-info">
        <span class="number">#${index + 1 < 10 ? '0' + (index + 1) : index + 1}</span>
        <h2>${project.header}</h2>
        <div class="tags">
          ${elTags}
        </div>
        <div class="buttons-container">
          <a href="https://github.com/Ptasi0r/javascript-projects/tree/master/${project.path}" target="_blank" class="github button">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.8598 3.17627C9.76203 3.17627 3.19885 9.73945 3.19885 17.8372C3.19885 24.3137 7.39841 29.8097 13.2252 31.75C13.9586 31.8823 14.2232 31.431 14.2232 31.043C14.2232 30.6946 14.2115 29.7715 14.2071 28.55C10.128 29.4349 9.26667 26.5832 9.26667 26.5832C8.60227 24.8899 7.63947 24.4386 7.63947 24.4386C6.3092 23.5287 7.7409 23.5493 7.7409 23.5493C9.21375 23.6522 9.98546 25.0604 9.98546 25.0604C11.2937 27.3006 13.4192 26.6538 14.2512 26.279C14.3849 25.3309 14.7671 24.6841 15.1846 24.3181C11.9302 23.9491 8.50819 22.6909 8.50819 17.0714C8.50819 15.4736 9.07999 14.1624 10.0134 13.1394C9.86493 12.7675 9.35781 11.2755 10.1589 9.25879C10.1589 9.25879 11.3892 8.86338 14.1894 10.7596C15.3853 10.4342 16.619 10.2682 17.8583 10.2657C19.0977 10.2677 20.3314 10.4338 21.5272 10.7596C24.3289 8.86191 25.5578 9.25879 25.5578 9.25879C26.3589 11.2755 25.8562 12.7675 25.7033 13.1394C26.644 14.1624 27.2085 15.4721 27.2085 17.0714C27.2085 22.7056 23.7836 23.9433 20.5174 24.3063C21.0392 24.7591 21.5096 25.6528 21.5096 27.0198C21.5096 28.9807 21.492 30.5623 21.492 31.043C21.492 31.4354 21.7536 31.8911 22.5018 31.747C28.3256 29.8038 32.5208 24.3122 32.5208 17.8372C32.5208 9.73945 25.9576 3.17627 17.8598 3.17627Z"
                fill="white"
              />
            </svg>
      
            GitHub</a
          >
          <a href="${project.path}/index.html" target="_blank" class="preview button">
            <svg width="31" height="24" viewBox="0 0 31 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.6957 12.3277C17.6957 13.0074 17.4257 13.6593 16.945 14.14C16.4644 14.6206 15.8125 14.8906 15.1328 14.8906C14.453 14.8906 13.8011 14.6206 13.3205 14.14C12.8398 13.6593 12.5698 13.0074 12.5698 12.3277C12.5698 11.648 12.8398 10.9961 13.3205 10.5154C13.8011 10.0348 14.453 9.76477 15.1328 9.76477C15.8125 9.76477 16.4644 10.0348 16.945 10.5154C17.4257 10.9961 17.6957 11.648 17.6957 12.3277Z"
                fill="black"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15.1328 0.794556C7.9668 0.794556 1.94648 5.69488 0.239563 12.3278C1.94648 18.9606 7.9668 23.8609 15.1328 23.8609C22.2974 23.8609 28.319 18.9606 30.026 12.3278C28.319 5.69488 22.2987 0.794556 15.1328 0.794556ZM20.2586 12.3278C20.2586 13.6872 19.7186 14.991 18.7573 15.9523C17.796 16.9136 16.4922 17.4536 15.1328 17.4536C13.7733 17.4536 12.4695 16.9136 11.5082 15.9523C10.5469 14.991 10.0069 13.6872 10.0069 12.3278C10.0069 10.9683 10.5469 9.6645 11.5082 8.70322C12.4695 7.74193 13.7733 7.20189 15.1328 7.20189C16.4922 7.20189 17.796 7.74193 18.7573 8.70322C19.7186 9.6645 20.2586 10.9683 20.2586 12.3278Z"
                fill="black"
              />
            </svg>
            Live Preview</a
          >
        </div>
      </section>
    `;

    projectsContainer.appendChild(el);
  });

  // Get all sliders container and creater from them the sliders
  const sliders = document.querySelectorAll('.splide');

  sliders.forEach((slider) => {
    new Splide(slider, {
      type: 'fade',
      rewind: true,
    }).mount();
  });
};

init();
