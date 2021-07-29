const express = require('express')
const router = express.Router()
const getController = require('../controllers/get')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', getController.getIndex)





module.exports = router