const loginSection = document.querySelector('.login-section');
const dashboard = document.querySelector('.dashboard');
const productsInfo = document.querySelector('#products-info');

const userName = document.querySelector('#user-name');

window.addEventListener('DOMContentLoaded', async () => {
    const userContext = JSON.parse(localStorage.getItem('userContext'));

    try {
        const token = userContext.token;
        const { data } = await axios.get('/api/v1/users/verify', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const username = `${userContext.user.firstname} ${userContext.user.lastname}`;
        userName.textContent = username;
        loginSection.style.display = 'none';
        dashboard.style.display = 'flex';
    } catch (error) {
        dashboard.style.display = 'none';
        loginSection.style.display = 'flex';
        console.log(error.response);
    }
});

const getProductsBtn = document.querySelector('#get-products-btn');
getProductsBtn.addEventListener('click', async () => {
    if(getProductsBtn.textContent === 'Get All Products') {
        const userContext = JSON.parse(localStorage.getItem('userContext'));
        const { data } = await axios.get('/api/v1/products', {
            headers: {
                Authorization: `Bearer ${userContext.token}`,
            },
        });
        // console.log(data);
        displayProducts(data.products.data);
        getProductsBtn.textContent = 'Clear';
    } else {
        productsInfo.innerHTML = '';
        getProductsBtn.textContent = 'Get All Products';
    }
});

const displayProducts = (products) => {
    productsInfo.innerHTML = '';

    products.forEach((product, idx) => {
        productsInfo.innerHTML += getHTML(product);
    });
}

const getHTML = (product) => {
    return `
    <div class="product">
        <p class="product-name">${product.name}</p>
        <p class="product-price">${product.price}$</p>
    </div>
    `
} 

const logoutBtn = document.querySelector('#logout-btn');

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('userContext');
    window.location = '/';
});