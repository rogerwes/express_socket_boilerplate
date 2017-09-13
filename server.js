var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var sockets = {};

server.listen(3000, function(){
    console.log('server listening on port 3000');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {

    sockets[socket.id] = socket;
    console.log('client ' + socket.id + ' connected');
    console.log("Total clients connected : ", Object.keys(sockets).length);

    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });

    socket.on('disconnect', function(){
        console.log('client ' + socket.id + ' disconnected');        
        delete sockets[socket.id];
        console.log("Total clients connected : ", Object.keys(sockets).length);
    });

});

