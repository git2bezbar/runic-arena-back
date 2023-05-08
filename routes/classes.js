var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

router.route('/')
  .get(async function(req, res, next) {
    /* Affichage complet */
    try {
      const classes = await prisma.class.findMany();
      res.send(classes);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .post(async function(req, res, next) {
    /* Ajout Classe */
    try {
      const { name, description } = req.body;
      const newClasse = await prisma.class.create({
        data: {
          name,
          description,
        },
      })
      res.send(newClasse);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  });

router.route('/:id')
  .get(async function(req, res, next) {
    /* Affichage unitaire classe */
    try {
      const id = parseInt(req.params.id);
      const classe = await prisma.class.findUnique({
        where: {
          id,
        },
      });
      res.send(classe);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .put(async function(req, res, next) {
    /* Mise à jour classe */
    try{
      const { name, description } = req.body;
      const id = parseInt(req.params.id);
      const updatedClasse = await prisma.class.update({
        where: {
          id,
        },
        data: {
          name,
          description,
        },
      })
      res.send(updatedClasse);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .delete(async function(req, res, next) {
    /* Suppression type */
    try{
      const id = parseInt(req.params.id);
      const deleteClasse = await prisma.class.delete({
        where: {
          id,
        },
      });
      res.send(deleteClasse);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  });

module.exports = router;
