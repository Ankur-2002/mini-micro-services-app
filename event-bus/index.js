const express = require("express");
const { default: axios } = require("axios");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
const events = [];
app.post("/events", async (req, res) => {
  try {
    const { body } = req;
    events.push(body);
    await axios
      .post("http://posts:4000/events", body)
      .catch((err) => console.log(err.message));
    await axios
      .post("http://comment:4001/events", body)
      .catch((err) => console.log(err.message));
    await axios
      .post("http://moderation:4003/events", body)
      .catch((err) => console.log(err.message));
    await axios
      .post("http://query:4002/events", body)
      .catch((err) => console.log(err.message));
    res.send({
      status: "OK",
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/events", (req, res) => {
  return res.send(events);
});
app.listen(4005, () => {
  console.log("Event url changed");
  console.log("Event bus is listening on PORT 4005");
});
