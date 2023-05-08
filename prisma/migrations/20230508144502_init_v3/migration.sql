/*
  Warnings:

  - You are about to drop the column `amout` on the `cost` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Cost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cost` DROP COLUMN `amout`,
    ADD COLUMN `amount` INTEGER NOT NULL;
