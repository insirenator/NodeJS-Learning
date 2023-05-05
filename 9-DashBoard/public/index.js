const loginSection = document.querySelector('.login-section');
const dashboard = document.querySelector('.dashboard');

window.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('token');

    if(!token) {
        dashboard.style.display = 'none';
        loginSection.style.display = 'flex';
    } else {
        loginSection.style.display = 'none';
        dashboard.style.display = 'flex';
    }
});

const getProductsBtn = document.querySelector('#get-products-btn');
getProductsBtn.addEventListener('click', async () => {
    const token = sessionStorage.getItem('token');
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