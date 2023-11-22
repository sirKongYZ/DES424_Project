let checkboxes = document.querySelectorAll('.mycheck');
let checkJson = [];
async function fetchDataFood() {
  const data = await fetch('https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis');
  const records = await data.json();
  console.log("fetched");
  let tab = '';
  records.body.forEach(function(body) {
    if(body.type == "food"){
      tab += `<tr>
      <td>${body.order_id}</td>
      <td>${body.table_id}</td>
      <td>${body.name}</td>
      <td>${body.quantity}</td>
      <td>${dateFormat(body.time)}</td>`
      if(body.status == "completed"){
        tab += `<td>Completed</td>`;
      }else{
        tab += `<td><button class = "mycheck" value="${body.transaction_id}">Check</button></td>
        </tr>`;
      }
      
    }
    console.log(body.transaction_id);
  })
  document.getElementById('tbody').innerHTML = tab;
  setTimeout(fetchDataFood, 4000);
} 


async function fetchDataDessert() {

  const data = await fetch('https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis');
  const records = await data.json();

  console.log("fetched");
  let tab = '';
  records.body.forEach(function(body) {
    if(body.type == "dessert"){
      tab += `<tr>
      <td>${body.order_id}</td>
      <td>${body.table_id}</td>
      <td>${body.name}</td>
      <td>${body.quantity}</td>
      <td>${dateFormat(body.time)}</td>`
      if(body.status == "completed"){
        tab += `<td>Completed</td>`;
      }else{
        tab += `<td><button class = "mycheck" value="${body.transaction_id}">Check</button></td>
        </tr>`;
      }
      
    }
    console.log(body.transaction_id);
  })
  document.getElementById('tbody').innerHTML = tab;
  setTimeout(fetchDataDessert, 5000);
}

async function fetchDataDrink() {

  const data = await fetch('https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis');
  const records = await data.json();

  console.log("fetched");
  let tab = '';
  records.body.forEach(function(body) {
    if(body.type == "drink"){
      tab += `<tr>
      <td>${body.order_id}</td>
      <td>${body.table_id}</td>
      <td>${body.name}</td>
      <td>${body.quantity}</td>
      <td>${dateFormat(body.time)}</td>`
      if(body.status == "completed"){
        tab += `<td>Completed</td>`;
      }else{
        tab += `<td><button class = "mycheck" value="${body.transaction_id}">Check</button></td>
        </tr>`;
      }
      
    }
    console.log(body.transaction_id);
  })
  document.getElementById('tbody').innerHTML = tab;
  setTimeout(fetchDataDrink, 3000);
}

async function fetchDataCashier() {
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
      <td><input type="checkbox" id="vehicle1" name="settings" value= ${body.price}></td>`
      document.getElementById('totalSum').textContent = setupCheckboxes();
      
  }
  })
  document.getElementById('tbody').innerHTML = tab;
  console.log("total: " + setupCheckboxes());
  


}





//<td><input type="checkbox" class="mycheck" onclick="checkStat()" value="${body.transaction_id}"></td>

document.addEventListener('click', (event) => {

  const lambdaUrl = "https://avxxvkbiea.execute-api.us-east-1.amazonaws.com/updateData/updateData";

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

    setTimeout(location.reload.bind(location), 2000);
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

function makeJsonFromCheck(transaction_id, name, quantity, price) {

}

async function fetchDataCashier() {
  const response = await fetch('https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis');
  const records = await response.json();

  let tab = '';
  records.body.forEach(function(body) {
      if(body.status == "completed"){
          tab += `<tr>
              <td>${body.order_id}</td>
              <td>${body.table_id}</td>
              <td>${body.name}</td>
              <td>${body.quantity}</td>
              <td>${body.time}</td>
              <td>${body.price}</td>
              <td><input type="checkbox" name="settings" value="${body.transaction_id}"></td>
          </tr>`;
      }
  });

  document.getElementById('tbody').innerHTML = tab;
  setupCheckboxes(); // Call this after the table is populated
//   setTimeout(fetchDataCashier, 3000);
 }


function setupCheckboxes() {
  var checkboxes = document.querySelectorAll("input[type=checkbox][name=settings]");
  let transactions = [];

  checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
          let transaction_id = checkbox.value;

          if (checkbox.checked) {
              transactions.push({transaction_id});
          } else {
              transactions = transactions.filter(id => id !== transaction_id);
          }

          console.log("Selected Transactions: ", transactions);
          localStorage.setItem("transaction_id", JSON.stringify(transactions));
          console.log("local: ", localStorage.getItem("transaction_id"));
          // Update some display element if necessary
          // For example, showing count of selected transactions
          document.getElementById('totalSum').textContent = transactions.length;
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.ourcheck');

  button.addEventListener('click', function() {
    console.log("clicked");
    if (confirm(`Check out?`)) { 
      sendDataToLambda()
    }
      
  });
});

async function sendDataToLambda() {
  try {
      // Prepare your data to send
      console.log("fetch: " + (localStorage.getItem("transaction_id")));
      // Make the fetch request to your Lambda function endpoint
      const response = await fetch('https://avxxvkbiea.execute-api.us-east-1.amazonaws.com/clearData/clearData', {
          method: 'POST', // or 'GET', depending on your Lambda setup
          headers: {
              'Content-Type': 'application/json',
          },
          body: localStorage.getItem("transaction_id")
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();

      console.log('Response from Lambda:', responseData);
      // Handle the response data as needed
      setTimeout(location.reload.bind(location), 2000);

  } catch (error) {
      console.error('Error sending data to Lambda:', error);
  }
}
