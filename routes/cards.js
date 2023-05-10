var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

router.route('/')
  .get(async function(req, res, next) {
    /* Affichage complet */
    try {
      const cards = await prisma.card.findMany();
      res.send(cards);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .post(async function(req, res, next) {
    /* Ajout card */
    try {
      const {
        name,
        surname,
        illustration,
        typeId,
        classId,
        power,
        abilityIdActive1,
        costId1Active1,
        costId2Active1,
        abilityIdActive2,
        costId1Active2,
        costId2Active2,
        abilityIdPassive1,
        conditionId,
      } = req.body;
      
      // Ajout et test des capacités passives
      const passive = await prisma.passive.findFirst({
        where: {
          abilityId: abilityIdPassive1,
          conditionId,
        }
      });
      let newPassive
      if (!passive) {
        newPassive = await prisma.passive.create({
          data:{
            abilityId: abilityIdPassive1,
            conditionId
          }
        });
      }   
      // Ajout et teste des capacités active 1 et 2 
      active1 = await prisma.active.create({
        data:{
          abilityId: abilityIdActive1,
        }
      })
      if(abilityIdActive2){
        active2 = await prisma.active.create({
          data: {
            abilityId:abilityIdActive2,
          }
        })
      };
      

      // Ajout et teste CostOnActive
      const cost1OnActive1 = await prisma.costOnActive.findFirst({
        where: {
          idActive: active1.id,
          idCost: costId1Active1
        }
      });

      let newCost1OnActive1
      if (!cost1OnActive1) {
        newCost1OnActive1 = await prisma.costOnActive.create({
          data: {
            idActive: active1.id,
            idCost: costId1Active1,
          }
        });
      }

      const cost2OnActive1 = await prisma.costOnActive.findFirst({
        where: {
          idActive:active1.id,
          idCost: costId2Active1,
        }
      });

      let newCost2OnActive1
      if (!cost2OnActive1 && costId2Active1) {
        newCost2OnActive1 = await prisma.costOnActive.create({
          data: {
            idActive:active1.id,
            idCost: costId2Active1,
          }
        });
      }

      // Cost On Active 2 si il y a
      if (active2) {
        const cost1OnActive2 = await prisma.costOnActive.findFirst({
          where: {
            idActive: active2.id,
            idCost: costId1Active2,
          }
        });

        let newCost1OnActive2
        if (!cost1OnActive2) {
          newCost1OnActive2 = await prisma.costOnActive.create({
            data: {
              idActive: active2 ? active2.id : newActive2.id,
              idCost: costId1Active2,
            }
          })
        }

        const cost2OnActive2 = await prisma.costOnActive.findFirst({
          where: {
            idActive:active2.id,
            idCost: costId2Active2,
          }
        });

        let newCost2OnActive2
        if (!cost2OnActive2 && costId2Active2) {
          newCost2OnActive2 = await prisma.costOnActive.create({
            data: {
              idActive:active2.id,
              idCost: costId2Active2,
            }
          });
        }
      }

      // Création de la carte
      const newCard = await prisma.card.create({
        data:{
          name,
          surname,
          illustration,
          power,
          classId,
          typeId,
          passiveId:passive ? passive.id : newPassive.id,
        }
      })
      
      // Ajout des actifs sur la carte
      const ActiveOnCard = await prisma.activeOnCard.create({
        data: {
          idCard:newCard.id,
          idActive:active1.id,
        }
      });

      if(abilityIdActive2){
        const Active2OnCard = await prisma.activeOnCard.create({
          data: {
            idCard:newCard.id,
            idActive:active2.id
          }
        });
      }

      res.send("La carte a bien été ajoutée");
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  });

router.route("/:id")
  .get(async function(req, res, next) {
    /* Affichage unitaire */
    try {
      const id = parseInt(req.params.id);
      const card = await prisma.card.findUnique({
        where: {
          id,
        }
      });
      res.send(card);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .put(async function(req, res, next) {
    /* Mise à jour card */
    try {
      const {
        name,
        surname,
        illustration,
        typeId,
        classId,
        power,
        abilityIdActive1,
        costId1Active1,
        costId2Active1, 
        abilityIdActive2,
        costId1Active2,
        costId2Active2,
        abilityIdPassive,
        conditionId,
      } = req.body;
      const id = parseInt(req.params.id);
      
      // Ajout et teste des capacités passive 
      const passive = await prisma.passive.findFirst({
        where: {
          abilityId: abilityIdPassive,
          conditionId,
        }
      });

      let newPassive
      if (!passive) {
        newPassive = await prisma.passive.create({
          data: {
            abilityId: abilityIdPassive,
            conditionId,
          }
        });
      }

      // Ajout et teste des capacités active 1 et 2 
      active1 = await prisma.active.create({
        data: {
          abilityId: abilityIdActive1,
        }
      });
      let active2
      if (abilityIdActive2) {
        active2 = await prisma.active.create({
          data: {
            abilityId: abilityIdActive2,
          }
        });
      }

      // Ajout et teste CostOnActive
      const cost1OnActive1 = await prisma.costOnActive.findFirst({
        where: {
          idActive: active1.id,
          idCost: costId1Active1,
        }
      });

      if (!cost1OnActive1) {
        const newCost1OnActive1 = await prisma.costOnActive.create({
          data: {
            idActive:active1.id,
            idCost: costId1Active1,
          }
        });
      }
      const cost2OnActive1 = await prisma.costOnActive.findFirst({
        where: {
          idActive: active1.id,
          idCost: costId2Active1,
        }
      });

      if (!cost2OnActive1 && costId2Active1) {
        const newCost2OnActive1 = await prisma.costOnActive.create({
          data: {
            idActive:active1.id,
            idCost: costId2Active1,
          }
        });
      }

      // Cost On Active 2 si il y a
      if (active2) {
        const cost1OnActive2 = await prisma.costOnActive.findFirst({
          where: {
            idActive:active2.id,
            idCost: costId1Active2
          }
        });

        if (!cost1OnActive2) {
          const newCost1OnActive2 = await prisma.costOnActive.create({
            data: {
              idActive:active2.id,
              idCost: costId1Active2,
            }
          });
        }
        const cost2OnActive2 = await prisma.costOnActive.findFirst({
          where: {
            idActive:active2.id,
            idCost: costId2Active2,
          }
        });

        if (!cost2OnActive2 && costId2Active2) {
          const newCost2OnActive2 = await prisma.costOnActive.create({
            data: {
              idActive: active2.id,
              idCost: costId2Active2,
            }
          });
        }
      }

      // Mise à jour de la carte
      const updatedCard = await prisma.card.update({
        where: {
          id,
        },
        data: {
          name,
          surname,
          illustration,
          power,
          classId,
          typeId,
          passiveId: passive ? passive.id : newPassive.id,
        },
      });
      
      // Ajout des actifs sur la carte
      const deleteActiveOnCard = await prisma.activeOnCard.deleteMany({
        where: {
          idCard: id,
        },
      });

      // Ajout des actifs sur la carte
      const ActiveOnCard = await prisma.activeOnCard.create({
        data: {
          idCard:id,
          idActive:active1.id,
        }
      });

      if (abilityIdActive2) {
        const Active2OnCard = await prisma.activeOnCard.create({
          data: {
            idCard:id,
            idActive: active2.id,
          }
        });
      }    
      res.send("La carte a bien été modifiée");
    } catch(error) {
      console.log(error);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  })
  .delete(async function(req, res, next) {
    /* Suppression ability */
    try {
      const id = parseInt(req.params.id);
      const deleteActiveOnCard = await prisma.activeOnCard.deleteMany({
        where: {
          idCard:id,
        }
      });
      const deleteCard = await prisma.card.delete({
        where: {
          id,
        }
      });
      res.send(deleteCard);
    } catch(error) {
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  });

router.route('/name-generator')
  .get(async function(req, res, next) {
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
      console.log(error.message);
      res.status(500).json({
        message:"Internal Server Error"
      });
    }
  });

module.exports = router;

