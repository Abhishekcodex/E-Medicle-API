const express = require('express');
const router = express.Router();
const coustomerLogout = require('../services/customerDetails');
router.post('/', async function(req, res, next) {
    try {
      res.json(await coustomerLogout.CustomerLogout(req.body.email,req.body.userId));
    } catch (err) {
      console.log(`Error while getting Customer Logout Method `, err.message);
      next(err);
    }
  });
  module.exports = router;