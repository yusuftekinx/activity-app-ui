
const token = require('../../Controller/Token/TokenController')
const express = require('express');
const router = express.Router();

router.post('/token/create',token)

module.exports = router;