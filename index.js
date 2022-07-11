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
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// session setup
const session = require("express-session");
let RedisStore = require("connect-redis")(session);
const Redis = require("ioredis");
let redisClient = new Redis();
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  store: new RedisStore({ client: redisClient }),
  cookie: { httpOnly: true, maxAge: 2 * 24 * 60 * 60 * 1000 },
});
app.use(sessionMiddleware);
const compression = require("compression");

// cors setup (development only)

console.log(process.env.PRODUCTION);
if (process.env.PRODUCTION) {
  app.use(express.static(`${__dirname}/frontend/build`));
}

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
const roomsUsersRoute = require("./routes/roomsUsersRoute");
app.use("/users", userRoute);
app.use("/rooms", roomsRoute);
app.use("/messages", messagesRoute);
app.use("/roomsUsers", roomsUsersRoute);

if (process.env.PRODUCTION) {
  app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/frontend/build/index.html`);
  });
}
// import and register socket handlers
const registerUserHandlers = require("./socketHandlers/userHandler");
const registerRoomsHandlers = require("./socketHandlers/roomsHandlers");
const registerMessageHandlers = require("./socketHandlers/messageHandler");

const onConnection = (socket) => {
  console.log("socket connected", socket.id);
  registerUserHandlers(io, socket);
  registerRoomsHandlers(io, socket);
  registerMessageHandlers(io, socket);
};

io.on("connection", onConnection);

// start server
const port = process.env.PORT || 9000;
server.listen(port, () => {});
// think about moving user info back into session and attaching that to socket on connection.
