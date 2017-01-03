// Make an express app variable.
let express = require('express');
let app     = express();

// Create server using app context
let serv = require('http').Server(app);

// Set constants
// const FPS = 25;
// const FRAMERATE = 1000 / FPS;
const PORT = process.env.PORT || 3000;

// Set static directory
app.use('/public', express.static(__dirname + '/public'));

// Set routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Set server to listen on PORT
serv.listen(PORT);
console.log("Server started on port " + PORT);

// Create socket.io variable using server
let io = require('socket.io')(serv,{});

// Create a list of sockets in use
let socketList = {};

// Tell socket.io what to do on connection
io.sockets.on('connection', (socket) => {
  // Log connection in console
  console.log("socket connected.");

  // Generate unique random id for socket
  do {
    socket.id = Math.random();
  }while(socketList[socket.id]);

  // Add socket to list of sockets in use
  socketList[socket.id] = socket;

  // Clean up after disconnect
  socket.on('disconnect', () => {
    delete socketList[socket.id];

    // Log disconnect in console
    console.log("socket disconnected.");
  });

});

// Use setinterval here for frame by frame functionality. (disabled by default)
// setinterval(() => {}, FRAMERATE);
