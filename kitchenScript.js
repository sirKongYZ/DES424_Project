let checkboxes = document.querySelectorAll('.mycheck');

async function fetchDataFood() {
  const data = await fetch('https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis');
  const records = await data.json();

  let tab = '';
  records.body.forEach(function(body) {
    if(body.type == "food"){
      tab += `<tr>
      <td>${body.transaction_id}</td>
      <td>${body.table_id}</td>
      <td>${body.name}</td>
      <td>${body.quantity}</td>
      <td>${body.time}</td>
      <td><button class = "mycheck" value="${body.transaction_id}">Check</button></td>
      </tr>`
    }else{

    }
    
  })
  document.getElementById('tbody').innerHTML = tab;

}

async function fetchDataDessert() {
  const data = await fetch('https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis');
  const records = await data.json();  

  let tab = '';
  records.body.forEach(function(body) {
    if(body.type == "dessert"){
      tab += `<tr>
      <td>${body.transaction_id}</td>
      <td>${body.table_id}</td>
      <td>${body.name}</td>
      <td>${body.quantity}</td>
      <td>${body.time}</td>
      <td><button class = "mycheck" value="${body.transaction_id}">Check</button></td>
      </tr>`
    }else{

    }
    document.getElementById('tbody').innerHTML = tab;
  })
}
//<td><input type="checkbox" class="mycheck" onclick="checkStat()" value="${body.transaction_id}"></td>

document.addEventListener('click', (event) => {

  const lambdaUrl = "https://avxxvkbiea.execute-api.us-east-1.amazonaws.com/clearData/clearData";

  if (event.target.classList.contains('mycheck')) {
    const transactionId = parseInt(event.target.value);

    if (confirm("Order Finished?")) { 
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


