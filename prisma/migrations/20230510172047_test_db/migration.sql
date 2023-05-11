-- DropIndex
DROP INDEX `Ability_skillId_fkey` ON `ability`;

-- DropIndex
DROP INDEX `Active_abilityId_fkey` ON `active`;

-- DropIndex
DROP INDEX `ActiveOnCard_idActive_fkey` ON `activeoncard`;

-- DropIndex
DROP INDEX `Card_classId_fkey` ON `card`;

-- DropIndex
DROP INDEX `Card_passiveId_fkey` ON `card`;

-- DropIndex
DROP INDEX `Card_typeId_fkey` ON `card`;

-- DropIndex
DROP INDEX `CostOnActive_idCost_fkey` ON `costonactive`;

-- DropIndex
DROP INDEX `Passive_abilityId_fkey` ON `passive`;

-- DropIndex
DROP INDEX `Passive_conditionId_fkey` ON `passive`;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Card` ADD CONSTRAINT `Card_passiveId_fkey` FOREIGN KEY (`passiveId`) REFERENCES `Passive`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passive` ADD CONSTRAINT `Passive_conditionId_fkey` FOREIGN KEY (`conditionId`) REFERENCES `Condition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Passive` ADD CONSTRAINT `Passive_abilityId_fkey` FOREIGN KEY (`abilityId`) REFERENCES `Ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Active` ADD CONSTRAINT `Active_abilityId_fkey` FOREIGN KEY (`abilityId`) REFERENCES `Ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActiveOnCard` ADD CONSTRAINT `ActiveOnCard_idCard_fkey` FOREIGN KEY (`idCard`) REFERENCES `Card`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActiveOnCard` ADD CONSTRAINT `ActiveOnCard_idActive_fkey` FOREIGN KEY (`idActive`) REFERENCES `Active`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CostOnActive` ADD CONSTRAINT `CostOnActive_idActive_fkey` FOREIGN KEY (`idActive`) REFERENCES `Active`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CostOnActive` ADD CONSTRAINT `CostOnActive_idCost_fkey` FOREIGN KEY (`idCost`) REFERENCES `Cost`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ability` ADD CONSTRAINT `Ability_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
