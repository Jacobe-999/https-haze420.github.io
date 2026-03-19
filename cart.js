// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart function
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

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}