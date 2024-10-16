/*
  Warnings:

  - You are about to drop the column `id_direcciones_fk` on the `usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_direccion_fk]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_direccion_fk` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_id_direcciones_fk_fkey`;

-- DropIndex
DROP INDEX `Direcciones_id_usuario_direccion_fk_fkey` ON `direcciones`;

-- DropIndex
DROP INDEX `Direcciones_numero_key` ON `direcciones`;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `id_direcciones_fk`,
    ADD COLUMN `id_direccion_fk` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Usuarios_id_direccion_fk_key` ON `Usuarios`(`id_direccion_fk`);

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_id_direccion_fk_fkey` FOREIGN KEY (`id_direccion_fk`) REFERENCES `Direcciones`(`idDirecciones`) ON DELETE RESTRICT ON UPDATE CASCADE;
