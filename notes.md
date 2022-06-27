ROOMS:
When a client socket is initialized, get currentRoom from user object and send it in socket property currentRoom. Then socket.join(socket.currentRoom)

SECURITY:
Hash user password client side before sending to server.

// load app

// http
// user
// messages for current room
// list of rooms

// socket
// users for current room

// update app
// socket
// update rooms
// update users in room
// update messages in room
