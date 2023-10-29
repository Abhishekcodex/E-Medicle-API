const express = require('express');
const router = express.Router();
const coustomerDetails = require('../services/customerDetails');
router.get('/', async function(req, res, next) {
  try {
    res.json(await coustomerDetails.getCustomerData(req.query.page));
  } catch (err) {
    console.log(`Error while getting Get Customer Data `, err.message);
    next(err);
  }
});
module.exports = router;