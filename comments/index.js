const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();

const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.use((req, _, next) => {
  console.log(req.path);
  next();
});
app.get("/posts/:id/comments", (req, res) => {
  return res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const comments = commentsByPostId[req.params.id] || [];
  const { content } = req.body;
  comments.push({ id: commentId, content, status: "Pending" });

  commentsByPostId[req.params.id] = comments;

  await axios.post("http://event:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content: content,
      postId: req.params.id,
      status: "Pending",
    },
  });
  return res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Event Recieved", req.body.type);
  try {
    const { type, data } = req.body;
    if (type === "CommentModerated") {
      const postId = data.postId;
      const comment = commentsByPostId[postId].find((com) => {
        return com.id === data.id;
      });
      comment.status = data.status;
      await axios.post("http://event:4005/events", {
        type: "CommentUpdated",
        data: {
          ...comment,
          postId,
        },
      });
    }

    return res.send({});
  } catch (error) {}
  res.send({});
});

app.listen(4001, () => {
  console.log("Server is listening on 4001");
});
