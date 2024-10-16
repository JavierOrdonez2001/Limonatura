/*
  Warnings:

  - You are about to drop the column `id_usuario_direccion_fk` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the `usuarios_direcciones` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_direcciones_fk]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_direcciones_fk` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `direcciones` DROP FOREIGN KEY `Direcciones_id_usuario_direccion_fk_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_id_usuario_direccion_fk_fkey`;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `id_usuario_direccion_fk`,
    ADD COLUMN `id_direcciones_fk` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `usuarios_direcciones`;

-- CreateIndex
CREATE UNIQUE INDEX `Usuarios_id_direcciones_fk_key` ON `Usuarios`(`id_direcciones_fk`);

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_id_direcciones_fk_fkey` FOREIGN KEY (`id_direcciones_fk`) REFERENCES `Direcciones`(`idDirecciones`) ON DELETE RESTRICT ON UPDATE CASCADE;
