const navToggleBtn = document.querySelector('.navbar-toggle');
const navBar = document.querySelector('.site-nav');
const modalToggleBtn = document.querySelector('.open-modal');
const closeModalBtn = document.querySelector('.close');
const modal = document.querySelector('.modal-container');

const hideModal = () => {
  modal.animate([{ opacity: '1' }, { opacity: '0' }], {
    duration: 1000,
  });
  setTimeout(() => {
    modal.classList.remove('show-modal');
  }, 990);
};

navToggleBtn.addEventListener('click', () => document.body.classList.toggle('show-nav'));

modalToggleBtn.addEventListener('click', () => modal.classList.add('show-modal'));
closeModalBtn.addEventListener('click', hideModal);

window.addEventListener('click', (e) => (e.target == modal ? hideModal() : false));
