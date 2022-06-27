// server setup
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
require("./io.js")(server);

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
// user register, login, getUser, checkAuth
app.use("/users", userRoute);
app.use("/rooms", roomsRoute);
app.use("/messages", messagesRoute);

// //rooms get rooms, add room
// app.get("/getRooms", getRooms);
// // app.post("/addRoom", addRoom);
// // messages
// app.post("/getMessages", getMessages);
// app.post("/addMessage", addMessage);

app.get("/checkAuth", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ isAuth: false });
  }

  res.json({ isAuth: true });
});

const port = process.env.PORT || 9000;
server.listen(port, () => {});
