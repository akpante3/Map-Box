const express = require('express');
const router = express.Router();
const { getStores, addStore } = require('../controller/stores.js')

router.route('/').get(getStores).post(addStore)

module.exports = router