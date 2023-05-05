const loginSection = document.querySelector('.login-section');
const dashboard = document.querySelector('.dashboard');

window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    try {
        const { data } = await axios.get('/api/v1/users/verify', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(data);
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
    const token = localStorage.getItem('token');
    const { data } = await axios.get('/api/v1/products', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(data);
    displayProducts(data.products.data);
});

const displayProducts = (products) => {
    console.log(products);
    const productsInfo = document.querySelector('#products-info');
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
    localStorage.removeItem('token');
    window.location = '/';
});