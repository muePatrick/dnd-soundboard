const express = require('express')
const fs = require("fs")
const cors = require('cors')
const http = require("http")
const WebSocket = require("ws")


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(__dirname + '/audio'));

app.get('/', (req, res) => {
  const files = fs.readdirSync(__dirname + "/audio")
  res.status(200).json({availableFiles: files}).send()
})

app.listen(4000)
console.log(`HTTP Server: 4000`);


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
let currentTrack = undefined
wss.on('connection', (ws) => {

    ws.on('message', (message) => {
      console.log('New Track: %s', message);
      currentTrack = message
      wss.clients
          .forEach(client => {
              client.send(`${message}`);
          });
    });

    ws.send(`${currentTrack}`);

});

server.listen(5000, () => {
  console.log(`WS Server: ${server.address().port}`);
});