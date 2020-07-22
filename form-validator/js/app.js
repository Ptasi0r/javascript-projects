const sliderContainer = document.querySelector('.login-slider');
const sliderItems = document.querySelectorAll('.login-slider li');
const sliderElement = document.querySelector('.focus-el');
const formsContainer = document.querySelector('.forms-container');
let sliderContainerRect = sliderContainer.getBoundingClientRect();

let activeIndex = 0;

const animateForm = (from, to) => {
  formsContainer.animate([{ transform: `translateX(calc(${from}))` }, { transform: `translateX(calc(${to}))` }], {
    duration: 500,
    easing: 'ease-in-out',
  });
  formsContainer.style.transform = `translateX(calc(${to}))`;
};

sliderItems.forEach((li, index) => {
  let liRect = li.getBoundingClientRect();
  li.addEventListener('click', () => {
    if (index == activeIndex) {
      return;
    }
    activeIndex = index;

    sliderElement.animate([{ left: `${sliderElement.offsetLeft}px` }, { left: `${liRect.left - sliderContainerRect.left}px` }], {
      duration: 500,
      easing: 'ease-in-out',
    });
    sliderElement.style.left = `${liRect.left - sliderContainerRect.left}px`;
    sliderItems.forEach((el) => {
      el.classList.toggle('active');
    });

    switch (activeIndex) {
      case 0:
        animateForm('-50% - 10px ', '0px');
        break;

      case 1:
        animateForm('0px', '-50% - 10px');

      default:
        break;
    }
  });
});
