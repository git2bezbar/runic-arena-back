var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

/* GET classes listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
