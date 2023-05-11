var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

router.route('/')
  .get(async function(req, res, next) {
    /* Affichage complet */
    try {
      const conditions = await prisma.condition.findMany();
      res.send(conditions);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })

module.exports = router;
