// Inside paymentForm submit handler in checkout page
const orderData = {
    name: name,
    address: address,
    phone: phone,
    paymentMethod: paymentSelect.value.toUpperCase(),
    total: checkoutTotal.innerText
};
localStorage.setItem('lastOrder', JSON.stringify(orderData));

// Redirect to confirmation page
window.location.href = 'order-confirmation.html';