const express = require('express')
const users = require('../controllers/user.js')
const { encode } = require('../middlewares/jwt.js')

const router = express.Router()

router
  .post('/login/:userId', encode, (req, res, next) => {
    return res
      .status(200)
      .json({
        success: true,
        authorization: req.authToken,
      })
  })

  module.exports = router
