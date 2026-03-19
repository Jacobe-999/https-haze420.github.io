document.addEventListener('DOMContentLoaded', () => {
    const productsGridMen = document.getElementById('productsGridMen');
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');

    let cart = [];
    const products = [
        {id:1, name:"Citrus Breeze", price:100, image:"images/product2.jpg"},
        {id:2, name:"Ocean Mist", price:105, image:"images/product4.jpg"},
        {id:3, name:"Spicy Oud", price:130, image:"images/product6.jpg"}
    ];

    function displayProducts() {
        productsGridMen.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            if(cart.find(item => item.id === product.id)) card.classList.add('added');
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                    ${cart.find(item => item.id === product.id) ? "Added" : "Add to Cart"}
                </button>
            `;
            productsGridMen.appendChild(card);
        });
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price;
            const div = document.createElement('div');
            div.classList.add('cart-item');
            div.innerHTML = `<p>${item.name}</p><span>$${item.price}</span>`;
            cartItems.appendChild(div);
        });
        cartTotal.innerText = total.toFixed(2);
        cartCount.innerText = cart.length;
        displayProducts();
    }

    productsGridMen.addEventListener('click', e => {
        if(e.target.classList.contains('add-to-cart')){
            const id = parseInt(e.target.dataset.id);
            if(!cart.find(item => item.id === id)){
                const product = products.find(p => p.id === id);
                cart.push(product);
                updateCart();
            }
        }
    });

    cartIcon.addEventListener('click', () => cartModal.style.display = 'block');
    closeCart.addEventListener('click', () => cartModal.style.display = 'none');
    window.addEventListener('click', e => { if(e.target==cartModal) cartModal.style.display='none'; });

    displayProducts();
    updateCart();
});