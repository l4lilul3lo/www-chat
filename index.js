// server setup
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// session setup
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const Redis = require("ioredis");
let redisClient = new Redis();
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
  cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 },
});
app.use(sessionMiddleware);

// cors setup (production only)
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// helmet setup (security)
const helmet = require("helmet");
app.use(helmet());

// essential/additional middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import and apply routes.
const userRoute = require("./routes/userRoute");
const roomsRoute = require("./routes/roomsRoute");
const messagesRoute = require("./routes/messagesRoute");

app.use("/users", userRoute);
app.use("/rooms", roomsRoute);
app.use("/messages", messagesRoute);

// import and register socket handlers
const registerUserHandlers = require("./socketHandlers/userHandler");
const registerRoomHandlers = require("./socketHandlers/roomHandler");
const registerMessageHandlers = require("./socketHandlers/messageHandler");

const onConnection = (socket) => {
  console.log("socket connected", socket.id);
  registerUserHandlers(io, socket);
  registerRoomHandlers(io, socket);
  registerMessageHandlers(io, socket);
};

io.on("connection", onConnection);

// start server
const port = process.env.PORT || 9000;
server.listen(port, () => {});
// think about moving user info back into session and attaching that to socket on connection.
