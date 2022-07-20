// server setup
const express = require("express");
const app = express();
const http = require("http");
require("dotenv").config();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

// cors setup (development only)
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3001", credentials: true }));

// helmet setup (security)
const helmet = require("helmet");
app.use(helmet());

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

// look into compressing text.

// static serve build if in production.
if (process.env.PRODUCTION) {
  app.use(express.static(`${__dirname}/frontend/build`));
}

// essential/additional middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// import and apply routes.
const userRoute = require("./routes/userRoute");
const roomsRoute = require("./routes/roomsRoute");
const messagesRoute = require("./routes/messagesRoute");
const roomsUsersRoute = require("./routes/roomsUsersRoute");
const authRoute = require("./routes/authRoute");
const isAuth = async (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  }

  return res.status(401).json({ isAuth: false });
};

app.use("/users", isAuth, userRoute);
app.use("/rooms", isAuth, roomsRoute);
app.use("/messages", isAuth, messagesRoute);
app.use("/roomsUsers", isAuth, roomsUsersRoute);
app.use("/auth", authRoute);
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
server.listen(port, () => {
  console.log("listening on 9000");
});
