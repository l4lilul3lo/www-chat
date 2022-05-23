When the user visits the application we should fetch user info. If the user is not logged in, the appropriate displayed anonymous image and name will be displayed.

When a user joins a room, an initial ui state should be fetched for the room.
When a user reloads, they will get a new socket id. We need to link this socket id to the user every time. So when the user makes a request to getUser, we can say:
if (req.session) {

}

ROOMS:
When a client socket is initialized, get currentRoom from user object and send it in socket property currentRoom. Then socket.join(socket.currentRoom)
