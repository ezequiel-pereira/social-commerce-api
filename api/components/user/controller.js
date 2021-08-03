const store = require("../../../store/mysql");
const { nanoid } = require("nanoid");

const TABLA = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/mysql");
  }

  function list() {
    return store.list(TABLA);
  }

  function get(id) {
    return store.get(TABLA, id);
  }

  function upsert(body) {
    let user = {
      username: body.username,
      name: body.name,
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    return store.insert(TABLA, user);
  }

  return {
    list,
    get,
    upsert,
  };
};
