const sliderContainer = document.querySelector('.login-slider');
const sliderItems = document.querySelectorAll('.login-slider li');
const sliderElement = document.querySelector('.focus-el');
const formsContainer = document.querySelector('.forms-container');
const register_form = document.querySelector('.form-signup-container');
const login_form = document.querySelector('.form-login-container');
const modalContainer = document.querySelector('.modal-container');

/* Forms slider */
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
    console.log(li, sliderElement.offsetLeft, liRect.left - sliderContainerRect.left);
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

/* Register form submit */

const getFieldName = (input) => {
  let name = input.getAttribute('name');
  name = name.replace('_', ' ');
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const showError = (input, msg) => {
  const parent = input.parentElement;
  const errorContainer = parent.querySelector('.error-msg');
  parent.classList.add('error');
  errorContainer.textContent = msg;
  errorContainer.style.visibility = 'visible';
};

const showSuccess = (input) => {
  const parent = input.parentElement;
  if (parent.classList.contains('error')) {
    parent.classList.remove('error');
  }
  parent.classList.add('success');
  const errorContainer = parent.querySelector('.error-msg');
  errorContainer.style.visibility = 'hidden';
};

const checkRequired = (inputs) => {
  let errorFlag = false;
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
      errorFlag = true;
    } else {
      showSuccess(input);
    }
  });
  return errorFlag;
};

const checkLength = (input, min, max) => {
  let errorFlag = false;
  const valueLength = input.value.length;
  if (valueLength < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    errorFlag = true;
  } else if (valueLength > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    errorFlag = true;
  } else {
    showSuccess(input);
  }
  return errorFlag;
};

const checkEmail = (input) => {
  let errorFlag = false;
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regEx.test(String(input.value).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is not valid`);
    errorFlag = true;
  }
  return errorFlag;
};

const checkPasswordStrong = (input) => {
  let errorFlag = false;
  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  if (regEx.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, `$Password is not strong`);
    errorFlag = true;
  }
  return errorFlag;
};

const checkMatch = (input, input2) => {
  let errorFlag = false;
  if (input.value === input2.value) {
    showSuccess(input2);
  } else {
    showError(input, `Passwords do not match`);
    errorFlag = true;
  }
  return errorFlag;
};

const checkConfirm = (input) => {
  let errorFlag = false;
  if (input.checked) {
    const parent = input.parentElement;
    if (parent.classList.contains('error')) {
      parent.classList.remove('error');
    }
    parent.classList.add('success');
  } else {
    const parent = input.parentElement;
    parent.classList.add('error');
  }
  return errorFlag;
};

register_form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstname = register_form.firstname;
  const lastname = register_form.lastname;
  const username = register_form.username;
  const email = register_form.email;
  const password = register_form.password;
  const confirm_password = register_form.confirm_password;
  const confirm = register_form.confirm;

  let errorFlag = false;
  /* check if errors */
  if (checkRequired([firstname, lastname, username, email, password, confirm_password])) {
    errorFlag = true;
  }

  if (checkLength(username, 4, 16)) {
    errorFlag = true;
  }

  if (checkEmail(email)) {
    errorFlag = true;
  }

  if (checkPasswordStrong(password)) {
    errorFlag = true;
  }

  if (checkMatch(password, confirm_password)) {
    errorFlag = true;
  }

  if (checkConfirm(confirm)) {
    errorFlag = false;
  }

  if (errorFlag) {
    console.error('Błąd!');
  } else {
    const user = {
      username: username.value,
      password: password.value,
    };

    localStorage.setItem('user', JSON.stringify(user));
    console.log({
      username: username.value,
      password: password.value,
    });

    modalContainer.style.display = 'flex';
    modalContainer.querySelector('.modal').innerHTML = `
          <h2 class="msg-header">Account has been created!</h2>
          <p>Check your email to complete registration</p>
          <button class="complete-btn">Complete Registation</button>
        `;

    document.querySelector('.complete-btn').addEventListener('click', () => {
      animateForm('-50% - 10px ', '0px');
      sliderElement.animate([{ left: `85px` }, { left: `0px` }], {
        duration: 500,
        easing: 'ease-in-out',
      });
      sliderElement.style.left = `0px`;
      sliderItems.forEach((el) => {
        el.classList.toggle('active');
      });
      modalContainer.style.display = 'none';
    });
  }
});

login_form.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = login_form.username;
  const password = login_form.password;

  let errorFlag = false;
  /* check if errors */
  if (checkRequired([username, password])) {
    errorFlag = true;
  }

  if (errorFlag) {
    console.error('Błąd!');
  } else {
    const user = localStorage.getItem('user');

    if (user) {
      const json_data = JSON.parse(user);
      const json_username = json_data['username'];
      const json_password = json_data['password'];
      console.log(json_username, json_password);
      if (username.value == json_username && password.value == json_password) {
        modalContainer.style.display = 'flex';
        modalContainer.querySelector('.modal').innerHTML = `
          <h2 class="msg-header">You are log in</h2>
          <p>Have a nice day!</p>
        `;
      }
    } else {
      alert('Nie założono konta');
    }
  }
});
