const express = require('express');
const router = express.Router();
const coustomerLogin = require('../services/customerDetails');
router.post('/', async function(req, res, next) {
    try {
      res.json(await coustomerLogin.CustomerLogin(req.body.email,req.body.password));
    } catch (err) {
      console.log(`Error while getting Customer Login `, err.message);
      next(err);
    }
  });
  module.exports = router;