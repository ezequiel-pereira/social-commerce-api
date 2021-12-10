const express = require('express');
const multer = require('multer');
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image');

const secure = require('./secure');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', list);
router.get('/:id', get);
router.post('/',uploadStrategy, upsert);
router.put('/', secure('update'), upsert);

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

function upsert(req, res, next) {
  Controller.upsert(req.body.user, req.file)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch(next);
};

module.exports = router;
