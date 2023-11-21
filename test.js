

var data = [{
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

var tableStr = '';
data2.forEach((obj) => {
  var userData = obj.jsondata;
  var dataLength = 0; // Corrected variable name and moved outside the loop

  userData.forEach((o, index) => {
    const type = o.type;
    if (type == "dessert") {
      if (index === 0) {
        // Only add these cells for the first dessert item in userData
        tableStr += '<tr>' +
          '<td rowspan="' + userData.length + '">' + obj.transaction_id + '</td>' +
          '<td rowspan="' + userData.length + '">' + obj.table_id + '</td>';
      }
      tableStr += '<td>' + o.name + '</td>' +
        '<td>' + o.quantity + '</td>';

      if (index === 0) {
        // Only add this cell for the first dessert item in userData
        tableStr += '<td rowspan="' + userData.length + '">' + obj.time + '</td>';
      }

      tableStr += '</tr>';
      dataLength += 1;
    }
  });

  // Add a button row for each 'obj' in data2
  tableStr += `<tr><td colspan="6"><button class="float-right mycheck" value="${obj.transaction_id}">Check</button></td></tr>`;
});

$('#user tbody').html(tableStr);

function mergeRows(data, columnName) {
    let mergedData = [];
    let seenValues = new Set();

    data.forEach(row => {
        if (!seenValues.has(row[columnName])) {
            seenValues.add(row[columnName]);
            let mergedRow = {...row};

            // Find and merge rows with the same value
            data.forEach(innerRow => {
                if (innerRow[columnName] === row[columnName] && innerRow !== row) {
                    // Merge logic goes here
                    // For example, summing up a certain field:
                }
            });

            mergedData.push(mergedRow);
        }
    });

    return mergedData;
}

// Example usage:
let data5 = [
    { id: 1, name: "Apple", quantity: 10 },
    { id: 2, name: "Banana", quantity: 5 },
    { id: 3, name: "Apple", quantity: 3 }
];

console.log(mergeRows(data5, "name"));



