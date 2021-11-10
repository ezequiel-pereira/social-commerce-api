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

  async function get(id) {

    let user = await store.get(TABLE, id)
    let addressId = user.address_id

    if (addressId =! '') {
      let address = await store.query('address', addressId)
      user.address = address
    }

    return user
  }

  async function upsert(body) {
    let user = {
      username: body.username,
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      profile_picture: body.profile_picture
    };

    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid();
    }

    if (body.auth_id) {
      user.auth_id = body.auth_id;
    } else {
      user.auth_id = nanoid();
    }

    if (body.username || body.password) {
      await auth.upsert({
        id: user.auth_id,
        username: user.username,
        password: body.password
      })
    }

    if (body.address && body.address.id) {
      user.address_id = body.address.id
      await store.upsert('address', body.address)
    } else if (body.address) {
      let newAddress = body.address
      newAddress.id = nanoid()
      user.address_id = newAddress.id
      await store.upsert('address', newAddress)
    }
    
    return store.upsert(TABLE, user);
  }

  return {
    list,
    get,
    upsert
  };
};
