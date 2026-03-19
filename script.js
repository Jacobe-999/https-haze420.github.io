// --- Product Data ---
const products = [
    {id:1, name:"Luxury Rose Perfume", price:120, image:"images/product1.jpg", category:"women"},
    {id:2, name:"Citrus Breeze", price:95, image:"images/product2.jpg", category:"men"},
    {id:3, name:"Vanilla Musk", price:110, image:"images/product3.jpg", category:"women"},
    {id:4, name:"Ocean Mist", price:105, image:"images/product4.jpg", category:"men"},
    {id:5, name:"Jasmine Bloom", price:115, image:"images/product5.jpg", category:"women"},
    {id:6, name:"Spicy Oud", price:130, image:"images/product6.jpg", category:"men"}
];

// --- DOM References ---
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartCount = document.querySelector('.cart-count');

// Load cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

// --- Display Products ---
function displayProducts() {
    productsGrid.innerHTML = '';
    let filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);

    filtered.forEach(product => {
        const inCart = cart.find(item => item.id === product.id);
        const card = document.createElement('div');
        card.classList.add('product-card');
        if(inCart) card.classList.add('added');

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                ${inCart ? 'Added' : 'Add to Cart'}
            </button>
        `;
        productsGrid.appendChild(card);
    });
}

// --- Filter Buttons ---
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        displayProducts();
    });
});

// --- Add to Cart ---
productsGrid.addEventListener('click', e => {
    if(e.target.classList.contains('add-to-cart')){
        const id = parseInt(e.target.dataset.id);
        if(!cart.find(item => item.id === id)){
            const product = products.find(p => p.id === id);
            cart.push(product);
            updateCart();
            displayProducts();
        }
    }
});

// --- Update Cart ---
function updateCart() {
    cartCount.innerText = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart)); // save cart for checkout
}

// --- Go to Checkout ---
const checkoutBtn = document.createElement('a');
checkoutBtn.href = 'checkout.html';
checkoutBtn.innerText = 'Go to Checkout';
checkoutBtn.classList.add('btn','btn-secondary');
document.body.appendChild(checkoutBtn);

// --- Initial Display ---
displayProducts();
updateCart();