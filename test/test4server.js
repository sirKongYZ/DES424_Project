const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Listen for messages from clients
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received JSON data:', data);

      // Broadcast the JSON data to all clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ echo: data })); // You can customize the response here
        }
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('WebSocket server is running on http://localhost:8080');
});
