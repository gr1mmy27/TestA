// This will add the client application
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

let id;
let x = Math.floor(Math.random() * 500);
let y = Math.floor(Math.random() * 500);

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit('register', { x, y });
});

socket.on('init', (clients) => {
  id = socket.id;
  for (let clientId in clients) {
    if (clientId !== id) {
      addClient(clientId, clients[clientId]);
    }
  }
});

socket.on('register', (data) => {
  addClient(socket.id, data);
});

socket.on('move', (data) => {
  moveClient(data.id, data.x, data.y);
});

socket.on('disconnect', (clientId) => {
  removeClient(clientId);
});

function addClient(clientId, data) {
  let el = document.createElement('div');
  el.className = 'client';
  el.id = clientId;
  el.style.left = data.x + 'px';
  el.style.top = data.y + 'px';
  document.body.appendChild(el);
}

function moveClient(clientId, x, y) {
  let el = document.getElementById(clientId);
  el.style.left = x + 'px';
  el.style.top = y + 'px';
}

function removeClient(clientId) {
  let el = document.getElementById(clientId);
  document.body.removeChild(el);
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      y -= 10;
      break;
    case 'ArrowDown':
      y += 10

      
// This will create the client application
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log(`Connected to server: ${socket.id}`);
});

socket.on('message', (data) => {
  console.log(`Server message: ${data}`);
});

// Handle movement
document.addEventListener('keydown', (event) => {
  let x = 0;
  let y = 0;

  switch (event.key) {
    case 'ArrowUp':
      y = -1;
      break;
    case 'ArrowDown':
      y = 1;
      break;
    case 'ArrowLeft':
      x = -1;
      break;
    case 'ArrowRight':
      x = 1;
      break;
    default:
      return;
  }

  socket.emit('move', { x, y });
});

socket.on('move', (data) => {
  console.log(`Client ${data.id} moved to (${data.x}, ${data.y})`);
});
