const express = require('express');
const router = express.Router();

const indexController = require("../controllers/indexController");

router.get('/', indexController.home);

router.get('/detail', indexController.detail);

router.post('/buy', indexController.buy);

router.get('/mercadopagoRedirect', indexController.mercadopagoRedirect);

router.post('/mercadopagoNotification', indexController.mercadopagoNotification)

module.exports = router;