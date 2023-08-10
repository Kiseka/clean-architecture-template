/*
  Warnings:

  - You are about to drop the column `account_activated` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `account_verified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `account_verified_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "account_activated",
DROP COLUMN "account_verified",
DROP COLUMN "account_verified_at",
DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "accountActivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "accountVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "accountVerifiedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
