const express = require("express");
const { default: axios } = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "Rejected" : "Approved";
    await axios.post("http://event:4005/events", {
      type: "CommentModerated",
      data: {
        ...data,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Moderation is running on PORT 4003");
});
