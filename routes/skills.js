var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

/* GET skills listing. */
router.get('/', async function(req, res, next) {
  try{
    const skills = await prisma.skill.findMany()
    res.send(skills)
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
    const skill = await prisma.skill.findUnique({
      where:{
        id:id
      }
    })
    res.send(skill)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});

/* Mise à jour skill */
router.post('/:id', async function(req, res, next) {
  try{
    const {name, description, isPercentage} = req.body
    const id = parseInt(req.params.id)
    const updatedSkill = await prisma.skill.update({
      where:{
        id:id
      },
      data:{
        name,
        description,
        isPercentage
      }
    })
    
    res.send(updatedSkill)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});


/* Ajout skill */
router.put('/', async function(req, res, next) {
  try{
    const {name, description,isPercentage} = req.body
    
    const newSkill = await prisma.skill.create({
      data:{
        name,
        description,
        isPercentage
      }
    })
    
    res.send(newSkill)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});

/* Suppression skill */
router.delete('/:id', async function(req, res, next) {
  try{
    const id = parseInt(req.params.id)
    const deleteSkill = await prisma.skill.delete({
      where:{
        id:id
      }
    })
    res.send(deleteSkill)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});
module.exports = router;
