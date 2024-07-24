const express = require("express");
// const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require("axios");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const handleEvent = async (type, data) => {
  try {
    if (type === "PostCreated") {
      postAndCommentData[data.id] = {
        ...data,
        comments: [],
      };
      // return res.status(201).send({ message: "Post Created Succesfully" });
    } else if (type === "CommentCreated") {
      // console.log(postAndCommentData, Object.keys(postAndCommentData));
      const comments = postAndCommentData[data.postId].comments || [];
      comments.push({
        id: data.id,
        content: data.content,
        status: data.status,
      });
      postAndCommentData[data.postId].comments = comments;
    } else if (type === "CommentUpdated") {
      const comment = postAndCommentData[data.postId].comments.find(
        (com) => com.id === data.id
      );
      comment.status = data.status;
      comment.content = data.content;
    }
  } catch (err) {}
};
const postAndCommentData = {};
// {"postId": { id: "postId", content: "CONTENT", comments: [] }}
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(type, " Event received");
  handleEvent(type, data);
  console.log(postAndCommentData, "Post data");
  res.send({});
});

app.get("/posts", (req, res) => {
  res.send(postAndCommentData);
});

app.listen(4002, async () => {
  console.log("Query Service is running on PORT 4002");
  try {
    const fetchEvents = await axios.get("http://event:4005/events");
    console.log(fetchEvents.data);
    const data = fetchEvents.data;
    for (const event of data) {
      console.log("Processing this event", event);
      handleEvent(event.type, event.data);
    }
  } catch (error) {}
});
