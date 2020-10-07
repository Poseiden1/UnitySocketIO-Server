// Settings
const port = 3000;

// Classes
var Player = require('./Classes/Player.js');

// Lists
var players = [];
var sockets = [];

// Networking Packages
var server = require('http').createServer();
var io = require('socket.io')(server);

// Start Server
server.listen(port, function() {
    console.log("Started Server at Port: %s", port);
});

// Listen to  new Connections
io.on('connection', function(socket) {
    var player = new Player();
    players[player.id] = player;
    sockets[player.id] = socket;
    socket.emit('connected', {
        id: player.id
    });
    console.log("%s connected!", player);

    socket.on('login', function(data) {
        if (data.username != "")
            player.username = data.username;
    });

    socket.on('disconnect', function() {
        console.log("%s disconnected!", player);
        delete players[player.id];
        delete sockets[player.id];
    });

});