const db = require("../knexConfig");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("register");
}

function findById(id) {
  return db("register").where({ id: Number(id) });
}

function add(post) {
  return db("register")
    .insert(post)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db("register")
    .where("id", Number(id))
    .update(post);
}

function remove(id) {
  return db("register")
    .where("id", Number(id))
    .del();
}
