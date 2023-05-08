var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

/* GET types listing. */
router.get('/', async function(req, res, next) {
  try{
    const types = await prisma.type.findMany()
    res.send(types)
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
    const type = await prisma.type.findUnique({
      where:{
        id:id
      }
    })
    res.send(type)
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
    const {name, description} = req.body
    const id = parseInt(req.params.id)
    const updatedType = await prisma.type.update({
      where:{
        id:id
      },
      data:{
        name,
        description
      }
    })
    
    res.send(updatedType)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});


/* Ajout type */
router.put('/', async function(req, res, next) {
  try{
    const {name, description} = req.body
    
    const newType = await prisma.type.create({
      data:{
        name,
        description
      }
    })
    
    res.send(newType)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});

/* Suppression type */
router.delete('/:id', async function(req, res, next) {
  try{
    const id = parseInt(req.params.id)
    const deleteType = await prisma.type.delete({
      where:{
        id:id
      }
    })
    res.send(deleteType)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});
module.exports = router;
