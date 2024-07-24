const cluster = require("cluster");
const { randomInt } = require("crypto");
if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  const express = require("express");
  const app = express();

  app.get("/", (req, res) => {
    let time = 100000;
    while (time--) {}
    try {
      console.log("GET IS CALLED");
      res.send("HEY THERE");
    } catch (err) {
      console.log(err);
    }
  });
  app.get("/fast", (req, res) => {
    try {
      console.log("GET IS CALLED");
      res.send("HEY THERE");
    } catch (err) {
      console.log(err);
    }
  });
  const int = +randomInt(10);
  app.listen(4000, () => {
    console.log("SERVER STARTED LISTENING ON" + 4000);
  });
}

cluster.on("listening", (worker, address) => {
  console.log(address, worker.id);
  console.log(
    `A worker is now connected to ${address.address}:${address.port}`
  );
});
