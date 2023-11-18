async function fetchData() {
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
          listItem.textContent = `Employee INFO: ${item.employee_id} ` + `${item.first_name} ${item.last_name}`;
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

    const employeeId = document.getElementById("employeeId").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    // AWS Lambda endpoint URL
    const lambdaUrl = "https://avxxvkbiea.execute-api.us-east-1.amazonaws.com/postOrder/redis";

    // Create a JSON object with the user input
    const data = {
        employee_id: employeeId,
        first_name: firstName,
        last_name: lastName
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
});

document.getElementById("invokeButton").addEventListener("click", () => {
    // AWS Lambda endpoint URL
    const lambdaUrl = "https://4ehky2erj4nn7zavzwa2capbcq0oasgk.lambda-url.us-east-1.on.aws/ ";

    // Make a GET request to the Lambda function
    fetch(lambdaUrl)
    .then(response => response.json())
    .then(data => {
        // Handle the Lambda function's response here
        document.getElementById("delete").textContent = JSON.stringify(data);
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("delete").textContent = "Error occurred.";
    });
});
