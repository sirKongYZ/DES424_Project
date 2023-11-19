/*async function fetchData() {
    try {
        const response = await fetch(
          "https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const jsonResponse = await response.json();
        const employeeData = jsonResponse.body[0]; // Extract the first item
  
        // Check if the "employee_id" property exists
        if (employeeData.hasOwnProperty("employee_id")) {
  
          const jsonContainer = document.getElementById('JSONContainer');
          jsonContainer.textContent = JSON.stringify(jsonResponse, null, 2);
  
          // Get the div element where you want to display the employee_id
  
        
            //Display list of info inside table of database
          const employeeList = document.getElementById("employeeList");
          jsonResponse.body.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = `Employee INFO: ${item.transaction_id} ` + `${item.table_id} ${item.product_id} ${item.name} ${item.quantity} ${item.time}`;
            employeeList.appendChild(listItem);
          });
        } else {
          console.error(
            "Missing 'employee_id' property in the JSON response"
          );
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    // Call the fetchData function when the page loads (you can trigger it with a button click or other events)
    window.addEventListener("load", fetchData);
  
    document.getElementById("employeeForm").addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the form from submitting normally
  
      const transaction_id = document.getElementById("transaction_id").value;
      const table_id = document.getElementById("table_id").value;
      const product_id = document.getElementById("product_id").value;
      const name = document.getElementById("name").value;
      const quantity = document.getElementById("quantity").value;
      const time = document.getElementById("time").value;
  
      // AWS Lambda endpoint URL
      const lambdaUrl = "https://avxxvkbiea.execute-api.us-east-1.amazonaws.com/postOrder/redis";
  
      // Create a JSON object with the user input
      const data = {
        transaction_id: transaction_id,
        table_id: table_id,
        product_id: product_id,
        name:name,
        quantity:quantity,
        time:time
      };
  
      // Make a POST request to the Lambda function
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
  });*/