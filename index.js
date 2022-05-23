const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 9000;
const session = require("express-session");
// no cors in production for socket.
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const { isAuth } = require("./middleware/isAuth");
const { register, login, getUser } = require("./controllers/user");
const { getRooms } = require("./controllers/rooms");
const { getMessages } = require("./controllers/messages");
const { getUsers } = require("./controllers/users");

// uncomment for production
// global.root = path.resolve(__dirname);
// app.use(express.static(`${root}/frontend/build`));
// app.get("/", (req, res) => res.sendFile(`${root}/frontend/build/index.html`));

// delete for production
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true, maxAge: 1000 * 60 * 60 },
  })
);

app.post("/register", register);
app.post("/login", login);
app.get("/getUser", isAuth, getUser);

app.get("/getUsers", getUsers);
app.get("/getRooms", getRooms);
app.get("/getMessages", getMessages);

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log(socket.current_room);

  socket.on("message", (msg) => {
    console.log("msg", msg);
    io.emit("message", msg);
  });
});

server.listen(port, () => {
  console.log("app is listening");
});
