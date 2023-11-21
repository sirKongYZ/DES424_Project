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
        "type": "dessert",
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
  
  var tableStr = '';
  data2.forEach((obj) => {
      var userData = obj.jsondata;
      var total = 0;
      userData.forEach((o, index) => {
        tableStr += '<tr>' + (index == 0 ? '<td rowspan="' + userData.length + '">' + obj.transaction_id + '</td>' : '')+ (index == 0 ? '<td rowspan="' + userData.length + '">' + obj.table_id + '</td>' : '') + '<td>'+obj.time+'</td><td>'+o.name+'</td><td>'+o.quantity+'</td></tr>';
         total += o.amount;
     });
     tableStr += '<tr><td colspan="4">Total</td><td>' + total + '</td></tr>';
     tableStr += `<tr><td colspan="5"><button value = ${obj.transaction_id} = >Check</button></td>`;
  });
  $('#user tbody').html(tableStr);


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