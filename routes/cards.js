var express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
var router = express.Router();

/* GET ability listing. */
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

/* Affichage unitaire */
router.get('/:id', async function(req, res, next) {
  try{
    const id = parseInt(req.params.id)
    const card = await prisma.card.findUnique({
      where:{
        id:id
      }
    })
    res.send(card)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});



/* Mise à jour card */
router.put('/:id', async function(req, res, next) {
  try{
    const {
      name, surname,illustration, typeId, classId, power,abilityIdActive1, costId1Active1,costId2Active1, abilityIdActive2, costId1Active2,costId2Active2,
      abilityIdPassive1, conditionId
    } = req.body
    const id = parseInt(req.params.id)
    
    // Ajout et teste des capacités passive 
    const passive = await prisma.passive.findFirst({
      where:{
        abilityId:abilityIdPassive1,
        conditionId
      }
    })
    if(!passive){
      const newPassive = await prisma.passive.create({
        data:{
          abilityId:abilityIdPassive1,
          conditionId
        }
      })
    }

    // Ajout et teste des capacités active 1 et 2 
    const active1 = await prisma.active.findFirst({
      where:{
        abilityId:abilityIdActive1,
      }
    })
    if(!active1){
      const newActive = await prisma.active.create({
        data:{
          abilityId:abilityIdActive1,
        }
      })
    }
    const active2 = await prisma.active.findFirst({
      where:{
        abilityId:abilityIdActive2,
      }
    })
    if(!active2 && abilityIdActive2){
      const newActive2 = await prisma.active.create({
        data:{
          abilityId:abilityIdActive2,
        }
      })
    }

    // Ajout et teste CostOnActive
    const cost1OnActive1 = await prisma.costOnActive.findFirst({
      where:{
        idActive:active1.id || newActive1.id,
        idCost:costId1Active1
      }
    })
    if(!cost1OnActive1){
      const newCost1OnActive1 = await prisma.costOnActive.create({
        data:{
          idActive:active1.id || newActive1.id,
          idCost:costId1Active1
        }
      })
    }
    const cost2OnActive1 = await prisma.costOnActive.findFirst({
      where:{
        idActive:active1.id || newActive1.id,
        idCost:costId2Active1
      }
    })
    if(!cost2OnActive1 && costId2Active1){
      const newCost2OnActive1 = await prisma.costOnActive.create({
        data:{
          idActive:active1.id || newActive1.id,
          idCost:costId2Active1
        }
      })
    }
    // Cost On Active 2 si il y a
    if(active2 || newActive2){
      const cost1OnActive2 = await prisma.costOnActive.findFirst({
        where:{
          idActive:active2.id || newActive2.id,
          idCost:costId1Active2
        }
      })
      if(!cost1OnActive2){
        const newCost1OnActive2 = await prisma.costOnActive.create({
          data:{
            idActive:active2.id || newActive2.id,
            idCost:costId1Active2
          }
        })
      }
      const cost2OnActive2 = await prisma.costOnActive.findFirst({
        where:{
          idActive:active2.id || newActive2.id,
          idCost:costId2Active2
        }
      })
      if(!cost2OnActive2 && costId2Active2){
        const newCost2OnActive2 = await prisma.costOnActive.create({
          data:{
            idActive:active2.id || newActive2.id,
            idCost:costId2Active2
          }
        })
      }
    }
    // Mise à jour de la carte
    const updatedCard = await prisma.card.update({
      where:{
        id:id
      },
      data:{
        name,
        surname,
        illustration,
        power,
        classId,
        typeId,
        passiveId: passive.id||newPassive.id
      }
    })
    
    // Ajout des actifs sur la carte
    const ActiveOnCard = await prisma.activeOnCard.findFirst.update({
      where:{
        idCard:id
      },
      data:{
        idActive: active.id||newActive.id
      }
    })


    const listActiveOnCard = await prisma.activeOnCard.findMany({
      where:{
        idCard:id
      }
    })
    const ActiveOnCard2 = listActiveOnCard[1]
    if(ActiveOnCard2){
      if(!active2 || !newActive2){
        const Active2OnCard = await prisma.activeOnCard.update({
          where:{
            id:ActiveOnCard2.id
          },
          data:{
            idActive: active2.id||newActive2.id
          }
        })
      }
      else{
        const Active2OnCard = await prisma.activeOnCard.delete({
          where:{
            id:ActiveOnCard2.id
          }
        })
      }
    }
    else{
      if(!active2 || !newActive2){
        const Active2OnCard = await prisma.activeOnCard.create({
          data:{
            idCard:id,
            idActive: active2.id||newActive2.id
          }
        })
      }
    }
    
    
    res.send()
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});



/* Ajout card */
router.put('/', async function(req, res, next) {
  try{
    const {
      name, surname,illustration, typeId, classId, power,abilityIdActive1, costId1Active1,costId2Active1, abilityIdActive2, costId1Active2,costId2Active2,
      abilityIdPassive1, conditionId
    } = req.body
    
    // Ajout et teste des capacités passive 
    const passive = await prisma.passive.findFirst({
      where:{
        abilityId:abilityIdPassive1,
        conditionId
      }
    })
    if(!passive){
      const newPassive = await prisma.passive.create({
        data:{
          abilityId:abilityIdPassive1,
          conditionId
        }
      })
    }

    // Ajout et teste des capacités active 1 et 2 
    const active1 = await prisma.active.findFirst({
      where:{
        abilityId:abilityIdActive1,
      }
    })
    if(!active1){
      const newActive = await prisma.active.create({
        data:{
          abilityId:abilityIdActive1,
        }
      })
    }
    const active2 = await prisma.active.findFirst({
      where:{
        abilityId:abilityIdActive2,
      }
    })
    if(!active2 && abilityIdActive2){
      const newActive2 = await prisma.active.create({
        data:{
          abilityId:abilityIdActive2,
        }
      })
    }

    // Ajout et teste CostOnActive
    const cost1OnActive1 = await prisma.costOnActive.findFirst({
      where:{
        idActive:active1.id || newActive1.id,
        idCost:costId1Active1
      }
    })
    if(!cost1OnActive1){
      const newCost1OnActive1 = await prisma.costOnActive.create({
        data:{
          idActive:active1.id || newActive1.id,
          idCost:costId1Active1
        }
      })
    }
    const cost2OnActive1 = await prisma.costOnActive.findFirst({
      where:{
        idActive:active1.id || newActive1.id,
        idCost:costId2Active1
      }
    })
    if(!cost2OnActive1 && costId2Active1){
      const newCost2OnActive1 = await prisma.costOnActive.create({
        data:{
          idActive:active1.id || newActive1.id,
          idCost:costId2Active1
        }
      })
    }
    // Cost On Active 2 si il y a
    if(active2 || newActive2){
      const cost1OnActive2 = await prisma.costOnActive.findFirst({
        where:{
          idActive:active2.id || newActive2.id,
          idCost:costId1Active2
        }
      })
      if(!cost1OnActive2){
        const newCost1OnActive2 = await prisma.costOnActive.create({
          data:{
            idActive:active2.id || newActive2.id,
            idCost:costId1Active2
          }
        })
      }
      const cost2OnActive2 = await prisma.costOnActive.findFirst({
        where:{
          idActive:active2.id || newActive2.id,
          idCost:costId2Active2
        }
      })
      if(!cost2OnActive2 && costId2Active2){
        const newCost2OnActive2 = await prisma.costOnActive.create({
          data:{
            idActive:active2.id || newActive2.id,
            idCost:costId2Active2
          }
        })
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
        passiveId: passive.id||newPassive.id
      }
    })
    
    // Ajout des actifs sur la carte
    const ActiveOnCard = await prisma.activeOnCard.create({
      data:{
        idCard:newCard.id,
        idActive: active.id||newActive.id
      }
    })
    if(!active2 || !newActive2){
      const Active2OnCard = await prisma.activeOnCard.create({
        data:{
          idCard:newCard.id,
          idActive: active2.id||newActive2.id
        }
      })
    }
    res.send()
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
    const deleteActiveOnCard = await prisma.activeOnCard.deleteMany({
      where:{
        idCard:id
      }
    })
    const deleteCard = await prisma.card.delete({
      where:{
        id:id
      }
    })
    res.send(deleteCard)
  }catch(error){
    console.log(error.message)
    res.status(500).json({
      message:"Internal Server Error"
    })
  }
});


module.exports = router;

