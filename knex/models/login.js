const db = require("../knexConfig");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("login");
}

function findById(id) {
  return db("login").where({ id: Number(id) });
}

function add(post) {
  return db("login")
    .insert(post)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db("login")
    .where("id", Number(id))
    .update(post);
}

function remove(id) {
  return db("login")
    .where("id", Number(id))
    .del();
}
