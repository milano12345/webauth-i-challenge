///IMPORTS///
const bcrypt = require("bcryptjs");
const dataBase = require("./knex/models/register");

///SERVER///

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

///ENDPOINTS ///
server.post("/api/register", (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;
  dataBase
    .add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error adding the hub"
      });
    });
});

server.post("/api/login", (req, res) => {
  dataBase
    .findBy(req.body.username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).json({ message: "The gate is unlocked" });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Unexpected error" });
    });
});

server.get("/api/users", (req, res) => {
  dataBase
    .find(req.query)
    .then(hubs => {
      res.status(200).send(hubs);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "User information could not be retreived"
      });
    });
});

///
