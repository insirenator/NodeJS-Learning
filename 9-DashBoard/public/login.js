const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');

const loginLink = document.querySelector('#login-link');
const registerLink = document.querySelector('#register-link');

const loginError = document.querySelector('.login-error');
const registerError = document.querySelector('.register-error');

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

// Logic for Login
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const credentials = Object.fromEntries([...formData.entries()]);
    // console.log(credentials);

    try {
        const { data } = await axios.post('/api/v1/users/login', credentials);
        console.log(data.token);
        localStorage.setItem('token', data.token);
        window.location = '/';
    } catch (error) {
        // console.log(error.response);
        loginError.textContent = error.response.data.msg;
        setTimeout(() => loginError.textContent = '', 3000);
    }
    //console.log('hello login');
});

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const userInfo = Object.fromEntries([...formData.entries()]);
    // console.log(userInfo);

    try {
        const { data } = await axios.post('/api/v1/users/register', userInfo);
        window.location = '/login.html';
        // console.log(data);
    } catch (error) {
        // console.log(error.response);
        registerError.textContent = 'fill out all fields';
        setTimeout(() => registerError.textContent = '', 3000)
    }
});