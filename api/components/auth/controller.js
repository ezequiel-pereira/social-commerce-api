const auth = require('../../../auth');
const bcrypt = require('bcrypt');

const TABLE = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;

  if (!store) {
    store = require("../../../store/mysql");
  }

  async function login(username, password) {
    let data = await store.query(TABLE, { username: username });
    let dataSign = {
      id: data.id,
      username: data.username
    }
    return bcrypt.compare(password, data.password)
      .then(result => {
        if (result) {
          return auth.sign(dataSign)
        } else {
            throw new Error('Bad credentials');
        }
      });
  }
  
  async function upsert(data) {
    let authData = {
      id: data.id
    }

    if (data.username) {
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData);
  }

  return {
    upsert,
    login
  };
};
