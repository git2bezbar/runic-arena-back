var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

router.route('/')
  .get(async function(req, res, next) {
    /* Affichage complet */
    try {
      const abilities = await prisma.ability.findMany();
      res.send(abilities);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .post(async function(req, res, next) {
    /* Ajout ability */
    try {
      const { name, amount,skillId } = req.body;
      const newAbility = await prisma.ability.create({
        data: {
          name,
          amount,
          skillId,
        },
      });
      res.send(newAbility);
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
      const ability = await prisma.ability.findUnique({
        where: {
          id,
        }
      });
      res.send(ability);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .put(async function(req, res, next) {
    /* Mise à jour type */
    try {
      const { name, amount, skillId } = req.body;
      const id = parseInt(req.params.id);
      const updatedAbility = await prisma.ability.update({
        where: {
          id,
        },
        data: {
          name,
          amount,
          skillId,
        },
      })
      res.send(updatedAbility);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .delete(async function(req, res, next) {
    /* Suppression ability */
    try{
      const id = parseInt(req.params.id);
      const deleteAbility = await prisma.ability.delete({
        where: {
          id,
        },
      })
      res.send(deleteAbility);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  });

module.exports = router;

