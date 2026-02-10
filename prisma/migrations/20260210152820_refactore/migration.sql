/*
  Warnings:

  - Added the required column `token` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `loan` DROP FOREIGN KEY `Loan_bookId_fkey`;

-- DropForeignKey
ALTER TABLE `loan` DROP FOREIGN KEY `Loan_userId_fkey`;

-- DropIndex
DROP INDEX `Loan_bookId_fkey` ON `loan`;

-- DropIndex
DROP INDEX `Loan_userId_fkey` ON `loan`;

-- AlterTable
ALTER TABLE `session` ADD COLUMN `token` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `Loan` ADD CONSTRAINT `Loan_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Loan` ADD CONSTRAINT `Loan_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
