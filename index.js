var net = require('net');
var file = require('flat-file-db');
var db = file('/tmp/redis.db');

var sockets = [];

function cleanInput(data) {
	return data.toString().replace(/(\r\n|\n|\r)/gm,"");
}

/*
 * Method executed when data is received from a socket
 */
function receiveData(socket, data) {
	var db = file.sync('/tmp/redis.db');
	var arr = data.toString().split(" ");	
	for(var i = 0; i<sockets.length; i++) {
		if (sockets[i] == socket) {
			if(arr[0] == 'SET') {
				db.put(arr[1], arr[2]);
				sockets[i].write('Data Set\n');
			} else if(arr[0] == 'GET') {
				var value = db.get(cleanInput(arr[1]).toString());
				sockets[i].write(value + '\n');
			}
		}
	}
}
 
/*
 * Method executed when a socket ends
 */
function closeSocket(socket) {
	var i = sockets.indexOf(socket);
	if (i != -1) {
		sockets.splice(i, 1);
	}
}
 
/*
 * Callback method executed when a new TCP socket is opened.
 */
function newSocket(socket) {
	sockets.push(socket);
	socket.write('Welcome to the server!\n');
	socket.on('data', function(data) {
		receiveData(socket, data);
	})
	socket.on('end', function() {
		closeSocket(socket);
	})
}
 
// Create a new server and provide a callback for when a connection occurs
var server = net.createServer(newSocket);
 
// Listen on port 8888
server.listen(8888);
