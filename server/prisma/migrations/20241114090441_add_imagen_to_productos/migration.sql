/*
  Warnings:

  - You are about to drop the column `imagen` on the `usuarios` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `productos` ADD COLUMN `imagen` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `imagen`;
