const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.get('/user/:id', getUserShop);
router.post('/', upsert);
router.put('/', secure('create'), upsert);

function list(req, res, next) {
  Controller.list()
    .then((list) => {
      response.success(req, res, list, 200);
    })
    .catch(next);
};

function get(req, res, next) {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
};

function getUserShop(req, res, next) {
  Controller.getUserShop(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
};

function upsert(req, res, next) {
  Controller.upsert(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch(next);
};

module.exports = router;
