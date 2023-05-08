var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

/* GET ability listing. */
router.get('/', async function(req, res, next) {
  try{
    const abilities = await prisma.ability.findMany()
    res.send(abilities)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});

/* Affichage unitaire */
router.get('/:id', async function(req, res, next) {
  try{
    const id = parseInt(req.params.id)
    const ability = await prisma.ability.findUnique({
      where:{
        id:id
      }
    })
    res.send(ability)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});



/* Mise à jour type */
router.post('/:id', async function(req, res, next) {
  try{
    const {name, amount, skillId} = req.body
    const id = parseInt(req.params.id)
    const updatedAbility = await prisma.ability.update({
      where:{
        id:id
      },
      data:{
        name,
        amount,
        skillId
      }
    })
    
    res.send(updatedAbility)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});


/* Ajout ability */
router.put('/', async function(req, res, next) {
  try{
    const {name, amount,skillId} = req.body
    
    const newAbility = await prisma.ability.create({
      data:{
        name,
        amount,
        skillId
      }
    })
    
    res.send(newAbility)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});

/* Suppression ability */
router.delete('/:id', async function(req, res, next) {
  try{
    const id = parseInt(req.params.id)
    const deleteAbility = await prisma.ability.delete({
      where:{
        id:id
      }
    })
    res.send(deleteAbility)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});


module.exports = router;

