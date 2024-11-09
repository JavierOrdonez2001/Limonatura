/*
  Warnings:

  - You are about to drop the column `numero_producto` on the `productos` table. All the data in the column will be lost.
  - You are about to drop the column `peso_kg` on the `productos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Productos_numero_producto_key` ON `productos`;

-- AlterTable
ALTER TABLE `productos` DROP COLUMN `numero_producto`,
    DROP COLUMN `peso_kg`,
    ADD COLUMN `peso` INTEGER NULL;
