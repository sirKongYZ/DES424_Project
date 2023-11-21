

var data500 = [{
    "user_data": [{
      "amount": 2550,
      "time1": "2017/04/05",
      "time2": "2017/04/06"
    }, {
      "amount": 2550,
      "time1": "2017/04/05",
      "time2": "2017/04/06"
    }],
    "name": "hulk",
    "table": 1
  }, {
    "user_data": [ {
      "amount": 2125,
      "time1": "2017/04/05",
      "time2": "2017/04/06"
    }, {
      "amount": 1700,
      "time1": "2017/04/05",
      "time2": "2017/04/06"
    }, {
      "amount": 1700,
      "time1": "2017/04/05",
      "time2": "2017/04/06"
    }, {
      "amount": 2125,
      "time1": "2017/04/05",
      "time2": "2017/04/06"
    }],
    "name": "gomu",
    "table": 2
  }];

  var data2 = [{
    "transaction_id": 81,
    "table_id": "1",
    "time": "2023-11-21T07:16:01.000Z",
    "jsondata": [
      {
        "name": "Food1",
        "type": "dessert",
        "quantity": 1,
        "product_id": "1"
      },
      {
        "name": "Food4",
        "type": "food",
        "quantity": 1,
        "product_id": "4"
      }
    ]
  }, {"transaction_id": 821,
  "table_id": "1",
  "time": "2023-11-21T07:16:01.000Z",
  "jsondata": [
    {
      "name": "Food1",
      "type": "dessert",
      "quantity": 1,
      "product_id": "1"
    },
    {
      "name": "Food4",
      "type": "dessert",
      "quantity": 1,
      "product_id": "4"
    }]}
  ];
  
  


function generateUniqueId() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let alphabeticPart = '';
  
    // Generate the first 2 alphabetic characters
    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      alphabeticPart += alphabet.charAt(randomIndex);
    }
  
    // Generate the remaining 8 numeric characters
    const numericPart = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  
    // Combine the alphabetic and numeric parts to create the unique ID
    const uniqueId = alphabeticPart + numericPart;
  
    return uniqueId;
  }
  
  const uniqueId = generateUniqueId();
  console.log(uniqueId);

  const data3 = {
    "transaction_id": 104,
    "table_id": "2",
    "time": "2023-11-21T11:55:30.000Z",
    "jsondata": [
      {
        "name": " Food1",
        "type": "dessert",
        "quantity": 1,
        "product_id": "2"
      },
      {
        "name": " Food2",
        "type": "food",
        "quantity": 1,
        "product_id": "3"
      },
      {
        "name": " Food3",
        "type": "food",
        "quantity": 1,
        "product_id": "4",
      }
    ],
    "order_id": "IS28780480"
  };
  
const dessertItems = data3.jsondata.filter((item) => item.type === "dessert");
const foodItems = data3.jsondata.filter((item) => item.type === "food");

// Extract "name" properties into separate arrays
const dessertNames = dessertItems.map((item) => item.name);
const foodNames = foodItems.map((item) => item.name);

console.log("Dessert Names:");
console.log(dessertNames);

console.log("Food Names:");
console.log(foodNames);

for (let i = 0; i < foodNames.length; i++) {
  const name = foodNames[i];
  console.log(name);
  // Perform your operation on 'name' here
}
async function fetchDataDrink() {
    const data = await fetch('https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis');
    const records = await data.json();

    console.log("fetched");
    let tab = '';
    records.body.forEach(function(body) {
    var total = 0;
    if(body.status == "completed"){
        tab += `<tr>
        <td>${body.order_id}</td>
        <td>${body.table_id}</td>
        <td>${body.name}</td>
        <td>${body.quantity}</td>
        <td>${body.time}</td>
        <td>${body.price}</td>
        <td><input type="checkbox" id="vehicle1" name="settings" value= ${body.transaction_id}></td>`
        document.getElementById('totalSum').textContent = setupCheckboxes();
        
    }
    })
    setupCheckboxes();
    document.getElementById('tbody').innerHTML = tab;
    console.log("total: " + setupCheckboxes());
    
    

 
}

const table = document.querySelector('table');

let headerCell = null;

for (let row of table.rows) {
const firstCell = row.cells[0];

if (headerCell === null || firstCell.innerText !== headerCell.innerText) {
    headerCell = firstCell;
} else {
    headerCell.rowSpan++;
    firstCell.remove();
}
}
/*function setupCheckboxes() {
    var checkboxes = document.querySelectorAll("input[type=checkbox][name=settings]");
    let enabledSettings = []
    let totalSum = 0;
    // Use Array.forEach to add an event listener to each checkbox.
    checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        console.log("checkbox triggered");
        enabledSettings = 
        Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
        .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
        .map(i => i.value) // Use Array.map to extract only the checkbox values from the array of objects.
        
        console.log(enabledSettings);

        let total = enabledSettings.reduce((acc, currentValue) => {
            return acc + Number(currentValue);
        }, 0);
        totalSum += total;
        console.log(totalSum);
        document.getElementById('totalSum').textContent = total;
    })
    }); 
}*/

// Function to fetch data from the API
async function fetchDataFromAPI() {
    try {
        const response = await fetch('https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis');
        const data = await response.json();
        console.log(data);
        return data;
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to set up checkboxes
async function setupCheckboxes() {
    // Fetch data from the API
    const apiData = await fetchDataFromAPI();

    // Check if data is available
    if (!apiData) {
        console.log("No data available from API");
        return;
    }else{
        console.log("fetched");
    }

    let checkboxes = document.querySelectorAll("input[type=checkbox][name=settings]");
    let enabledSettings = [];
    let totalSum = 0;

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', async function() {
            // If checkbox is checked, add relevant data from API to enabledSettings
            if (checkbox.checked) {
                const relevantData = apiData.find(item => item.id === checkbox.value); // assuming each item has an 'id'
                if (relevantData) {
                    enabledSettings.push(relevantData);
                }
            } else {
                // Remove unchecked item from enabledSettings
                enabledSettings = enabledSettings.filter(item => item.id !== checkbox.value);
            }

            // Calculate and display total
            let total = enabledSettings.reduce((acc, item) => acc + Number(item.price), 0); // assuming items have a 'price' property
            document.getElementById('totalSum').textContent = total;

            console.log(enabledSettings);
        });
    });
}


