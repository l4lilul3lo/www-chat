const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 9000;
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const Redis = require("ioredis");
let redisClient = new Redis();
const { addMessageDB, getMessagesDB } = require("./models/messages/messages");
const { getCafeIdDB } = require("./models/rooms/rooms");
// no cors in production for socket.
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const userRoute = require("./routes/userRoute");

const { isAuth } = require("./middleware/isAuth");
const { register, login, getUser } = require("./controllers/user");
const { getRooms } = require("./controllers/rooms");
const { getMessages, addMessage } = require("./controllers/messages");
const { getUsers } = require("./controllers/users");
const { getChatState } = require("./controllers/getChatState");

// uncomment for production
// global.root = path.resolve(__dirname);
// app.use(express.static(`${root}/frontend/build`));
// app.get("/", (req, res) => res.sendFile(`${root}/frontend/build/index.html`));

// delete for production
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 },
});

app.use(sessionMiddleware);

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

// user register login getUser, checkAuth
app.use("/user", userRoute);

// users getUsers
app.get("/getUsers", getUsers);

//rooms get rooms, add room
app.get("/getRooms", getRooms);
// app.post("/addRoom", addRoom);
// messages
app.post("/getMessages", getMessages);
app.post("/addMessage", addMessage);

app.get("/checkAuth", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ isAuth: false });
  }

  res.json({ isAuth: true });
});

// close the socket and open a new one for joining new room.

io.on("connection", (socket) => {
  socket.join("cafe");

  socket.on("message", (msg) => {
    const { userId, roomName, roomId, content, color, background } = msg;
    // add message to room table based on room name I guess...
    addMessageDB(userId, roomId, content, color, background);
    io.emit("broadcast", msg);
  });

  socket.on("join room", async (room) => {
    socket.join(room);
    const messages = await getMessagesDB(room.id);
    socket.emit("joined room", "room");
  });
});

server.listen(port, () => {
  console.log("app is listening");
});

// move
