let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let clearLocal = document.querySelector('.clearLocal');
let checkoutCart = document.querySelector('.checkOut');
let products = [];
let drinks = [];
let desserts = [];
let cart = [];
let cartJSON = {};
let list1 = [];


iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

    const addDataToHTML = () => {}
    
    //     // add new datas
    //     if (products.length > 0) {
    //         products.forEach((product, index) => {
    //             let newProduct = document.createElement('div');
    //             newProduct.dataset.id = product.id;
    //             newProduct.classList.add('item1');
    //             newProduct.innerHTML =
    //                 `<img src="${product.image}" alt="">
    //                 <h2>${product.name}</h2>
    //                 <div class="price">$${product.price}</div>
    //                 <button class="addCart">Add To Cart</button>`;
    //             listProductHTML.appendChild(newProduct);
    
    //             // Add pop-up animation with a delay based on the index
    //             setTimeout(() => {
    //                 newProduct.classList.add('pop-up');
    //             }, 100 * index);

                
    //         });
    //     }
    // }

    
    
    listProductHTML.addEventListener('click', (event) => {
        console.log(listProductHTML);
        let positionClick = event.target;
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            console.log(id_product);
            addToCart(id_product);
            
        }
    })
    
const addToCart = (product_id) => {
    console.log(localStorage.getItem('selectedOption'));
    if(localStorage.getItem('selectedOption') != null && localStorage.getItem('selectedOption') != "none"){
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
        let table_id = parseInt(localStorage.getItem('selectedOption'));
        if(cart.length <= 0){
            cart = [{
                "table_id" : table_id,
                product_id: product_id,
                "name": getProductName(product_id),
                quantity: 1,
                "type": getType(product_id),
                "price" : getPrice(product_id)
            }];
            localStorage.setItem('type', getType(product_id));
            console.log(localStorage.getItem('type'));
        }else if(positionThisProductInCart < 0){
            cart.push({
                "table_id" : table_id,
                product_id: product_id,
                "name": getProductName(product_id),
                quantity: 1,
                "type": getType(product_id),
                "price" : getPrice(product_id)
            });
            localStorage.setItem('type', getType(product_id));
        }
        else{
            cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity +1 ;
        }
        console.log(cart);
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
const getProductInfoById = (productId) => {
    const positionProduct = products.findIndex((value) => value.id == productId);
    return positionProduct >= 0 ? products[positionProduct] : null;
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            console.log(cart);

            // Use the helper function to get product information
            let info = getProductInfoById(item.product_id);

            // Log relevant information
            console.log('Item ID:', item.product_id);
            console.log('Position in Products:', products.indexOf(info));
            
            


            if (info) {
                // Display the item in the cart only if product information is found
                console.log('Products Array:', info.image);

                

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
            }
            console.log(listCartHTML);

        });
    }
    iconCartSpan.innerText = totalQuantity;
};

// Rest of your code remains unchanged


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
            console.log(selectedValue);
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
    //console.log(JSON.stringify(data));
    console.log(localStorage.getItem('cart'));
    fetch(lambdaUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: localStorage.getItem('cart'),
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
    alert("Order has been sent");
    //setTimeout(location.reload.bind(location), 1000);

    
    
})

const initApp = () => {
    // get data product
    fetch('products.json')
    .then(response => response.json())
    .then(data => {


        products = data;
        // addDataToHTML();

        // get data cart from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}


function updateDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Months are zero-based, so add 1
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const datetimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    // Update the content of the 'datetime' paragraph element
    const datetimeElement = document.getElementById('datetime');
    datetimeElement.textContent = datetimeString;
}

const getProductName = (product_id) => {
    const product = products.find((item) => item.id == product_id);
    return product ? product.name : '';
};

const getPrice = (product_id) => {
    const product = products.find((item) => item.id == product_id);
    return product ? product.price : '';
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
