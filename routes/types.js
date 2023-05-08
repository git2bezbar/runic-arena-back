var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

router.route('/')
  .get(async function(req, res, next) {
    /* Affichage complet */
    try {
      const types = await prisma.type.findMany();
      res.send(types);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .post(async function(req, res, next) {
    /* Ajout type */
    try {
      const { name, description } = req.body;
      const newType = await prisma.type.create({
        data: {
          name,
          description,
        }
      });
      res.send(newType);
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
      const type = await prisma.type.findUnique({
        where: {
          id,
        },
      });
      res.send(type);
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
      const { name, description } = req.body;
      const id = parseInt(req.params.id);
      const updatedType = await prisma.type.update({
        where: {
          id,
        },
        data: {
          name,
          description,
        },
      });
      res.send(updatedType);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .delete(async function(req, res, next) {
    /* Suppression type */
    try {
      const id = parseInt(req.params.id);
      const deleteType = await prisma.type.delete({
        where: {
          id,
        },
      });
      res.send(deleteType);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      })
    };
  });

module.exports = router;
