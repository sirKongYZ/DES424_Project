let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let clearLocal = document.querySelector('.clearLocal');
let checkoutCart = document.querySelector('.checkOut');
let products = [];
let cart = [];
let cartJSON = {};


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {
    // remove datas default from HTML

        // add new datas
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="" class = "rounded">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <div class="price">${product.type}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            addToCart(id_product);
        }
    })
const addToCart = (product_id) => {
    console.log(localStorage.getItem('selectedOption'));
    if(localStorage.getItem('selectedOption') != null && localStorage.getItem('selectedOption') != "none"){
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
        if(cart.length <= 0){
            cart = [{
                product_id: product_id,
                "name": getProductName(product_id),
                quantity: 1,
                "type": getType(product_id)
            }];
            
        }else if(positionThisProductInCart < 0){
            cart.push({
                product_id: product_id,
                "name": getProductName(product_id),
                quantity: 1,
                "type": getType(product_id)
            });
        }else{
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
        }
        console.log("cart: " + JSON.stringify(cart));
        addCartToHTML();
        addCartToMemory();
        console.log(localStorage.getItem('cart'));
    }else{
        alert("please enter table number first");
    }
    
    
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(cart.length > 0){
        cart.forEach(item => {
            totalQuantity = totalQuantity +  item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    iconCartSpan.innerText = totalQuantity;
    
}

clearLocal.addEventListener('click', (event) => {
    localStorage.clear();
})

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
    
}

document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.getElementById('dropdown');
    // Load data from localStorage on page load
    const selectedOption = localStorage.getItem('selectedOption');
    if (selectedOption) {
        dropdown.value = selectedOption;
    }

    // Add an event listener to the dropdown
    dropdown.addEventListener('change', function() {
        if(localStorage.getItem('cart') != null){
            alert("please clear before you change table");
        }else{
            const selectedValue = dropdown.value;
            // Store the selected option in localStorage
            localStorage.setItem('selectedOption', selectedValue);
            console.log(localStorage.getItem('selectedOption'));
        }
        
    });

    if (localStorage.getItem('selectedOption') == null) {
        // Clear the dropdown selection
        dropdown.selectedIndex = 0;
    }
});

checkoutCart.addEventListener('click', (event) => {
    console.log(localStorage.getItem('cart'));

    console.log("checkoutCart event triggered");
    const lambdaUrl = "https://avxxvkbiea.execute-api.us-east-1.amazonaws.com/clearData/redis";

    // Create a JSON object with the user input
    const str = localStorage.getItem('selectedOption');
    const intValue = Number(str);
    // Make a POST request to the Lambda function
    var data = {
        "table_id" : intValue,
        "jsondata" : localStorage.getItem('cart')
    };
    console.log(JSON.stringify(data));
    console.log(localStorage.getItem('cart'));
    fetch(lambdaUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(responseData => {
        // Handle the Lambda function's response here
        console.log("body: " + responseData.body)
        document.getElementById("result").textContent = JSON.stringify(responseData);
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").textContent = "Error occurred.";
    });
    localStorage.clear();
    alert(JSON.stringify(data));
    //setTimeout(location.reload.bind(location), 1000);
    
    
})

const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
const getProductName = (product_id) => {
    const product = products.find((item) => item.id == product_id);
    return product ? product.name : '';
};

const getType = (product_id) => {
    const product = products.find((item) => item.id == product_id);
    return product ? product.type : '';
};

// Call the function to update the date and time immediately when the page loads
//updateDateTime();

// Update the date and time every second (1000 milliseconds)
//setInterval(updateDateTime, 1000);
initApp();