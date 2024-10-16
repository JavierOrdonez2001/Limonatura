/*
  Warnings:

  - The primary key for the `carrito` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idUduario_boleta` on the `carrito` table. All the data in the column will be lost.
  - You are about to drop the column `id_producto` on the `carrito` table. All the data in the column will be lost.
  - You are about to drop the column `id_usuario` on the `carrito` table. All the data in the column will be lost.
  - You are about to drop the column `id_rol` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `id_direccione` on the `usuarios_direcciones` table. All the data in the column will be lost.
  - You are about to drop the column `id_usuario` on the `usuarios_direcciones` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_usuario_fk]` on the table `Carrito` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_rol_fk]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_usuario_direccion_fk]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - The required column `idCarrito` was added to the `Carrito` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id_usuario_fk` to the `Carrito` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario_direccion_fk` to the `Direcciones` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_rol_fk` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_usuario_direccion_fk` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `carrito` DROP FOREIGN KEY `Carrito_id_producto_fkey`;

-- DropForeignKey
ALTER TABLE `carrito` DROP FOREIGN KEY `Carrito_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `Usuarios_id_rol_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios_direcciones` DROP FOREIGN KEY `Usuarios_direcciones_id_direccione_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios_direcciones` DROP FOREIGN KEY `Usuarios_direcciones_id_usuario_fkey`;

-- AlterTable
ALTER TABLE `carrito` DROP PRIMARY KEY,
    DROP COLUMN `idUduario_boleta`,
    DROP COLUMN `id_producto`,
    DROP COLUMN `id_usuario`,
    ADD COLUMN `idCarrito` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_usuario_fk` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idCarrito`);

-- AlterTable
ALTER TABLE `direcciones` ADD COLUMN `id_usuario_direccion_fk` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `productos` ADD COLUMN `id_carrito_fk` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `id_rol`,
    ADD COLUMN `id_rol_fk` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_usuario_direccion_fk` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios_direcciones` DROP COLUMN `id_direccione`,
    DROP COLUMN `id_usuario`;

-- CreateIndex
CREATE UNIQUE INDEX `Carrito_id_usuario_fk_key` ON `Carrito`(`id_usuario_fk`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuarios_id_rol_fk_key` ON `Usuarios`(`id_rol_fk`);

-- CreateIndex
CREATE UNIQUE INDEX `Usuarios_id_usuario_direccion_fk_key` ON `Usuarios`(`id_usuario_direccion_fk`);

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_id_rol_fk_fkey` FOREIGN KEY (`id_rol_fk`) REFERENCES `Roles`(`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_id_usuario_direccion_fk_fkey` FOREIGN KEY (`id_usuario_direccion_fk`) REFERENCES `Usuarios_direcciones`(`idUduario_direcciones`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Direcciones` ADD CONSTRAINT `Direcciones_id_usuario_direccion_fk_fkey` FOREIGN KEY (`id_usuario_direccion_fk`) REFERENCES `Usuarios_direcciones`(`idUduario_direcciones`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrito` ADD CONSTRAINT `Carrito_id_usuario_fk_fkey` FOREIGN KEY (`id_usuario_fk`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_id_carrito_fk_fkey` FOREIGN KEY (`id_carrito_fk`) REFERENCES `Carrito`(`idCarrito`) ON DELETE SET NULL ON UPDATE CASCADE;
