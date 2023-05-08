var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

/* GET cards listing. */
router.get('/', async function(req, res, next) {
  try{
    const cards = await prisma.card.findMany()
    res.send(cards)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});

module.exports = router;
