const { nanoid } = require("nanoid");
const auth = require("../auth");

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

  async function upsert(body) {
    let user = {
      username: body.username,
      name: body.name
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.username || body.password) {
      await auth.upsert({
        id: user.id,
        username: user.username,
        password: body.password
      })
    }
    return store.upsert(TABLE, user);
  }

  return {
    list,
    get,
    upsert
  };
};
