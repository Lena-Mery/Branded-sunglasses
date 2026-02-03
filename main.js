
function showNotification(massage) {
    const notification = document.getElementById('notification');
    notification.innerText = massage;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);

}
function addToCart() {
    //document.getElementsByTagName('main')[0].style.display = 'none';

    let image = document.getElementById('glasses').src;
    let name = document.getElementById('name').innerText;
    let price = Number(document.getElementById('price').innerText.replace("$", ""));
    let count = Number(document.getElementById('gCount').innerText);

    let productInfo = {
        image: image,
        name: name,
        price: price,
        count: count
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let found = cart.find(item => item.name === productInfo.name);

    if (found) {
        found.count += productInfo.count;
    }
    else {
        cart.push(productInfo);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    showNotification("Signature look.\nIn your cart.");
}

function renderCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-container');
    let infoContainer = document.getElementById('info-container'); //?
    let totalPrice = document.getElementById('total-price');
    totalPrice.classList.add('totalPrice'); // TOTAL PRICE CLASS

    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        document.getElementsByTagName('main')[0].style.display = 'block';
        document.getElementById('info-container').style.display = 'none';
        totalPrice.innerHTML = '';
        return;
    }

    document.getElementsByTagName('main')[0].style.display = 'none';
    document.getElementById('info-container').style.display = 'block';

    
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        let productDiv = document.createElement('div');
        total += item.price * item.count; 
        productDiv.classList.add('cart-item');

        productDiv.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="cart-img">

    <div class="cart-info">
        <h3 class="cart-name">${item.name}</h3>
        <p class="cart-count">Quantity: ${item.count}</p>
    </div>

    <div class="cart-actions">
        <p class="cart-price">$ ${(item.price * item.count).toFixed(2)}</p>
        <button onclick="removeFromCart(${index})" class="removeBtnDinamic">
            Remove
        </button>
    </div>
`;

        cartContainer.appendChild(productDiv);
    });

    totalPrice.innerHTML = `TOTAL: ${total.toFixed(2)}`; 
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index].count > 1) {
        cart[index].count -= 1;
    }
    else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

