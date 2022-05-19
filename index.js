const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const http = require("http");
const server = http.createServer(app);
const port = process.env.PORT || 9000;
const session = require("express-session");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const { getLastFourty } = require("./models/messages/messages");

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

getMessages();

let olderMessages = [];
const messages = [];

function addMessageToMemory(message, messages, olderMessages) {
  if (olderMessages.length >= 10) {
    // store overflow.
    // reset overflow.
  }
  if (messages.length > 10) {
    const oldMessage = messages.shift();
    olderMessages.push(oldMessage);
  } else {
    messages.push(message);
  }
  console.log("messages", messages);
  console.log("olderMessages", olderMessages);
}

// check time since last message was sent.
io.on("connection", (socket) => {
  // if db.getOverflow.rows.length > 0
  // get requested scrolled result.
  // else get olderMessages array.
  console.log(socket.id);

  socket.emit("initialize", messages);
  socket.on("message", (msg) => {
    console.log("msg", msg);
    addMessageToMemory(msg, messages, olderMessages);
    io.emit("message", msg);
  });
});

server.listen(port, () => {
  console.log("app is listening");
});
