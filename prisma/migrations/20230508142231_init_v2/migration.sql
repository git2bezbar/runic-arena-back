/*
  Warnings:

  - You are about to drop the column `amout` on the `ability` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Ability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ability` DROP COLUMN `amout`,
    ADD COLUMN `amount` INTEGER NOT NULL;
