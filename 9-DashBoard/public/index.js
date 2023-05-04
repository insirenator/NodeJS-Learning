const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');

const loginLink = document.querySelector('#login-link');
const registerLink = document.querySelector('#register-link');

// Hide Register Form
registerForm.style.display = 'none';

loginLink.addEventListener('click', () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';
});

registerLink.addEventListener('click', () => {
    registerForm.style.display = 'flex';
    loginForm.style.display = 'none';
});


loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
});