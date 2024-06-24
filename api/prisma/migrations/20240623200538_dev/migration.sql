/*
  Warnings:

  - You are about to drop the column `correoId` on the `Blocked` table. All the data in the column will be lost.
  - You are about to drop the column `bloqueado` on the `User` table. All the data in the column will be lost.
  - Added the required column `blockedCorreo` to the `Blocked` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Blocked" DROP COLUMN "correoId",
ADD COLUMN     "blockedCorreo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bloqueado";

-- AddForeignKey
ALTER TABLE "Blocked" ADD CONSTRAINT "Blocked_blockedCorreo_fkey" FOREIGN KEY ("blockedCorreo") REFERENCES "User"("correo") ON DELETE RESTRICT ON UPDATE CASCADE;
