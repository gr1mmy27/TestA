npm install socket.io

// This piece of code will implement a server application
const io = require('socket.io')(3000);

let clients = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('register', (data) => {
    clients[socket.id] = data;
    socket.broadcast.emit('register', data);
  });

  socket.on('move', (data) => {
    clients[socket.id].x = data.x;
    clients[socket.id].y = data.y;
    socket.broadcast.emit('move', { id: socket.id, x: data.x, y: data.y });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    delete clients[socket.id];
    socket.broadcast.emit('disconnect', socket.id);
  });

  socket.emit('init', clients);
});

// This will create the server application
const io = require('socket.io')();

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  // Send a message to the client when it connects
  socket.emit('message', 'You are connected!');

  // Handle movement messages from the client
  socket.on('move', (data) => {
    console.log(`Client ${socket.id} moved to (${data.x}, ${data.y})`);

    // Broadcast the new position to all other clients
    socket.broadcast.emit('move', {
      id: socket.id,
      x: data.x,
      y: data.y
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const port = process.env.PORT || 3000;

io.listen(port);

console.log(`Server listening on port ${port}`);
