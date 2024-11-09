/*
  Warnings:

  - You are about to drop the column `id_carrito_fk` on the `productos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `productos` DROP FOREIGN KEY `Productos_id_carrito_fk_fkey`;

-- AlterTable
ALTER TABLE `carrito` ADD COLUMN `id_producto_fk` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `productos` DROP COLUMN `id_carrito_fk`;

-- AddForeignKey
ALTER TABLE `Carrito` ADD CONSTRAINT `Carrito_id_producto_fk_fkey` FOREIGN KEY (`id_producto_fk`) REFERENCES `Productos`(`idProducto`) ON DELETE SET NULL ON UPDATE CASCADE;
