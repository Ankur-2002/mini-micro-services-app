const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/", (req, res, next) => {
  res.send("Post Service is working on PORT 4000");
});
app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id: id,
    title,
  };
  await axios
    .post("http://event:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    })
    .catch((err) => {
      console.log(err);
    });
  return res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Event Recieved", req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
