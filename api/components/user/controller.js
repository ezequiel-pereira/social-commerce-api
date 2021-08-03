const { nanoid } = require("nanoid");

const TABLE = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/mysql");
  }

  function list() {
    return store.list(TABLE);
  }

  function get(id) {
    return store.get(TABLE, id);
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

    return store.upsert(TABLE, user);
  }

  return {
    list,
    get,
    upsert,
  };
};
