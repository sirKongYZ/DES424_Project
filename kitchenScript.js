
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


let checkboxes = document.querySelectorAll('.mycheck');

async function fetchDataFood() {
  const data = await fetch('https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis');
  const records = await data.json();
  var tableStr = '';
  records.body.forEach(function(obj) {
      var userData = obj.jsondata;
      var total = 0;
      userData.forEach((o, index) => {
        tableStr += '<tr>' + (index == 0 ? '<td rowspan="' + userData.length + '">' + obj.transaction_id + '</td>' : '')+ (index == 0 ? '<td rowspan="' + userData.length + '">' + obj.table_id + '</td>' : '') + '<td>'+o.name+'</td><td>'+o.quantity+ (index == 0 ? '<td rowspan="' + userData.length + '">' + dateFormat(obj.time) + '</td>' : '')+'</td></tr>';
         total += o.amount;
     });
     tableStr += `<tr><td colspan="6"><button class = "float-right mycheck" value = ${obj.transaction_id} = >Check</button></td>`;
  });
  $('#user tbody').html(tableStr);
} 


async function fetchDataDessert() {

  const data = await fetch('https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis');
  const records = await data.json(); 
  var tableStr = '';
  records.body.forEach(function(obj) {
      var userData = obj.jsondata;
      var total = 0;
      userData.forEach((o, index) => {
        tableStr += '<tr>' + (index == 0 ? '<td rowspan="' + userData.length + '">' + obj.transaction_id + '</td>' : '')+ (index == 0 ? '<td rowspan="' + userData.length + '">' + obj.table_id + '</td>' : '') + '<td>'+o.name+'</td><td>'+o.quantity+ (index == 0 ? '<td rowspan="' + userData.length + '">' + dateFormat(obj.time) + '</td>' : '')+'</td></tr>';
         total += o.amount;
     });
     tableStr += `<tr><td colspan="6"><button class = "float-right mycheck" value = ${obj.transaction_id} = >Check</button></td>`;
  });
  $('#user tbody').html(tableStr);

  /*let tab = '';
  records.body.forEach(function(body) {
    const listArr = ['food1', 'food2'];
    if(body.type == "dessert"){
      tab += `<tr>
      <td>${body.transaction_id}</td>
      <td>${body.table_id}</td>
      <td>${listArr}</td>
      <td>${body.quantity}</td>
      <td>${dateFormat(body.time)}</td>
      <td><button class = "mycheck" value="${body.transaction_id}">Check</button></td>
      </tr>`
    }else{

    }
    document.getElementById('tbody').innerHTML = tab;
  })*/
  //setTimeout(fetchDataDessert, 3000);
}




//<td><input type="checkbox" class="mycheck" onclick="checkStat()" value="${body.transaction_id}"></td>

document.addEventListener('click', (event) => {

  const lambdaUrl = "https://avxxvkbiea.execute-api.us-east-1.amazonaws.com/clearData/clearData";

  if (event.target.classList.contains('mycheck')) {
    console.log("button triggered");
    const transactionId = parseInt(event.target.value);

    if (confirm(`Finish Order: ${transactionId}?`)) { 
      const checkData = {
        transaction_id: transactionId
      };
      
      // Send checkData to the Lambda function
      fetch(lambdaUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(checkData),
    })
    .then(response => response.json())
    .then(responseData => {
        // Handle the Lambda function's response here
        console.log("body: " + responseData.body)
        //document.getElementById("result").textContent = JSON.stringify(responseData);
    })
    .catch(error => {
        console.error("Error:", error);
        //document.getElementById("result").textContent = "Error occurred.";
    });

    setTimeout(location.reload.bind(location), 1000);
    } else {
      console.log("Canceled");
    }
  }

});

function dateFormat (dateJSON){
  const dateString = dateJSON;
  const dateObject = new Date(dateString);

  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Months are zero-based, so we add 1 to get the correct month.
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const seconds = dateObject.getSeconds();

  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return formattedDate + " " + formattedTime; 
}