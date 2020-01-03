const express = require('express');
const router = express.Router();
const { getStores } = require('../controller/stores.js')

router.route('/').get(getStores)

module.exports = router