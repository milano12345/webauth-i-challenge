const express = require("express");

const server = express();

server.use(express.json());

const port = 9000;

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server is alive!" });
});

server.listen(port, () => {
  console.log(`=== Server listening on port ${port} ===`);
});

server.get("/api/register", (req, res) => {
  res.status(200).json({ message: "Server is alive!" });
});

server.post("/api/login", (req, res) => {
  res.status(200).json({ message: "Server is alive!" });
});

server.get("/api/users", (req, res) => {
  res.status(200).json({ message: "Server is alive!" });
});
