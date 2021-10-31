const { nanoid } = require("nanoid");

const TABLE = "shop";

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
    let shop = {
      name: body.name,
      user_id: body.user_id
    };
    
    if (body.id) {
      shop.id = body.id;
    } else {
      shop.id = nanoid();
    }

    if (body.userId) {
      await store.upsert('user_' + TABLE, {
        user: body.userId,
        shop: shop.id
      });
    }
    return store.upsert(TABLE, shop);
  }

  async function getUserShop(userId) {
    return await store.query(TABLE, {user_id: userId});
  }

  return {
    list,
    get,
    upsert,
    getUserShop
  };
};
