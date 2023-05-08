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

router.get('/name-generator', async function(req, res, next) {
  try {
    const names = await prisma.name.findMany();
    const random = Math.floor(Math.random() * names.length) + 1;
    const randomName = await prisma.name.findUnique({
      where: {
        id: random,
      }
    });

    const surnames = await prisma.surname.findMany();
    const randombis = Math.floor(Math.random() * surnames.length) + 1;
    const randomSurname = await prisma.surname.findUnique({
      where: {
        id: randombis,
      },
    });

    res.send({
      name: randomName.name,
      surname: randomSurname.name,
    });
  } catch(error) {
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});

module.exports = router;
