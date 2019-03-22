const express = require("express");

const server = express();

server.use(express.json());

const router = require("./data/router.js");

server.get("/", (req, res) => {
  res.send("hello world");
});

server.use("/api/posts", router);

module.exports = server;
