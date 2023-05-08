var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

/* GET types listing. */
router.get('/', async function(req, res, next) {
  try{
    const classes = await prisma.class.findMany()
    res.send(classes)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});

/* Affichage unitaire classe */
router.get('/:id', async function(req, res, next) {
  try{
    const id = parseInt(req.params.id)
    const classe = await prisma.class.findUnique({
      where:{
        id:id
      }
    })
    res.send(classe)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});

/* Mise à jour classe */
router.post('/:id', async function(req, res, next) {
  try{
    const {name, description} = req.body
    const id = parseInt(req.params.id)
    const updatedClasse = await prisma.class.update({
      where:{
        id:id
      },
      data:{
        name,
        description
      }
    })
    
    res.send(updatedClasse)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});


/* Ajout Classe */
router.put('/', async function(req, res, next) {
  try{
    const {name, description} = req.body
    
    const newClasse = await prisma.class.create({
      data:{
        name,
        description
      }
    })
    
    res.send(newClasse)
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
    const deleteClasse = await prisma.class.delete({
      where:{
        id:id
      }
    })
    res.send(deleteClasse)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});
module.exports = router;
