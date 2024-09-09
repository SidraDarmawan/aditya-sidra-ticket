/*
  Warnings:

  - Added the required column `location` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `location` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatarUrl` VARCHAR(191) NULL,
    ADD COLUMN `birthDate` DATETIME(3) NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL,
    ADD COLUMN `isDelete` BOOLEAN NULL DEFAULT false,
    ADD COLUMN `isVerified` BOOLEAN NULL;
