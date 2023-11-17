<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Display JSON Data</title>
  </head>
  <body>
    <h1>JSON Data from Lambda Function</h1>
    <pre id="json-container"></pre>
    <!-- Container for JSON data -->

    <script>
      // Function to fetch JSON data from the Lambda function
      async function fetchData() {
        try {
          const response = await fetch(
            "https://jv5md3e0wj.execute-api.us-east-1.amazonaws.com/redisStage/redis"
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const jsonData = await response.json();
          const jsonContainer = document.getElementById("json-container");

          // Display the JSON data in a preformatted block
          jsonContainer.textContent = JSON.stringify(jsonData, null, 2);
        } catch (error) {
          console.error("Error:", error);
        }
      }

      // Call the fetchData function when the page loads
      window.onload = fetchData;
    </script>
  </body>
</html>
