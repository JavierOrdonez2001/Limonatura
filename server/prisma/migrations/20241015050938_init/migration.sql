-- CreateTable
CREATE TABLE `Roles` (
    `idRol` VARCHAR(191) NOT NULL,
    `rol` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Roles_rol_key`(`rol`),
    PRIMARY KEY (`idRol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `idUsuario` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `rut` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `id_rol` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuarios_rut_key`(`rut`),
    UNIQUE INDEX `Usuarios_email_key`(`email`),
    UNIQUE INDEX `Usuarios_telefono_key`(`telefono`),
    UNIQUE INDEX `Usuarios_id_rol_key`(`id_rol`),
    PRIMARY KEY (`idUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios_direcciones` (
    `idUduario_direcciones` VARCHAR(191) NOT NULL,
    `id_usuario` VARCHAR(191) NOT NULL,
    `id_direccione` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idUduario_direcciones`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direcciones` (
    `idDirecciones` VARCHAR(191) NOT NULL,
    `pais` VARCHAR(191) NOT NULL,
    `ciudad` VARCHAR(191) NOT NULL,
    `comuna` VARCHAR(191) NOT NULL,
    `calle` VARCHAR(191) NOT NULL,
    `numero` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Direcciones_numero_key`(`numero`),
    PRIMARY KEY (`idDirecciones`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Carrito` (
    `idUduario_boleta` VARCHAR(191) NOT NULL,
    `id_usuario` VARCHAR(191) NOT NULL,
    `id_producto` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Carrito_id_usuario_key`(`id_usuario`),
    PRIMARY KEY (`idUduario_boleta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productos` (
    `idProducto` VARCHAR(191) NOT NULL,
    `numero_producto` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,
    `precio` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `stock` INTEGER NOT NULL,
    `peso_kg` INTEGER NULL,

    UNIQUE INDEX `Productos_numero_producto_key`(`numero_producto`),
    PRIMARY KEY (`idProducto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `Roles`(`idRol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios_direcciones` ADD CONSTRAINT `Usuarios_direcciones_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios_direcciones` ADD CONSTRAINT `Usuarios_direcciones_id_direccione_fkey` FOREIGN KEY (`id_direccione`) REFERENCES `Direcciones`(`idDirecciones`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrito` ADD CONSTRAINT `Carrito_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Carrito` ADD CONSTRAINT `Carrito_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `Productos`(`idProducto`) ON DELETE RESTRICT ON UPDATE CASCADE;
