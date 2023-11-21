const WebSocket = require('ws');
const http = require('http');
const express = require('express');

const app = express(); // Create an Express app

// Serve static files (like index.html) from the current directory
app.use(express.static(__dirname));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received JSON data:', data);

      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ echo: data }));
        }
      });
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('WebSocket server is running on http://localhost:8080');
});