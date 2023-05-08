var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

router.route('/')
  .get(async function(req, res, next) {
    /* Affichage complet */
    try {
      const skills = await prisma.skill.findMany();
      res.send(skills);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .post(async function(req, res, next) {
    /* Ajout skill */
    try{
      const {name, description,isPercentage} = req.body;
      const newSkill = await prisma.skill.create({
        data: {
          name,
          description,
          isPercentage,
        },
      });
      res.send(newSkill);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  });

router.route('/:id')
  .get(async function(req, res, next) {
    /* Affichage unitaire */
    try {
      const id = parseInt(req.params.id);
      const skill = await prisma.skill.findUnique({
        where: {
          id,
        },
      });
      res.send(skill);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .put(async function(req, res, next) {
    /* Mise à jour skill */
    try{
      const { name, description, isPercentage } = req.body;
      const id = parseInt(req.params.id);
      const updatedSkill = await prisma.skill.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          isPercentage,
        },
      });
      res.send(updatedSkill);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .delete(async function(req, res, next) {
    /* Suppression skill */
    try {
      const id = parseInt(req.params.id);
      const deleteSkill = await prisma.skill.delete({
        where: {
          id,
        },
      });
      res.send(deleteSkill);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  });

module.exports = router;
