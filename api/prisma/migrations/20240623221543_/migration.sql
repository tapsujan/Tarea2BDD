/*
  Warnings:

  - You are about to drop the `BlockedUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlockedUser" DROP CONSTRAINT "BlockedUser_blocked_correo_fkey";

-- DropForeignKey
ALTER TABLE "BlockedUser" DROP CONSTRAINT "BlockedUser_user_correo_fkey";

-- DropTable
DROP TABLE "BlockedUser";

-- CreateTable
CREATE TABLE "Blocked" (
    "user_correo" TEXT NOT NULL,
    "blocked_correo" TEXT NOT NULL,

    CONSTRAINT "Blocked_pkey" PRIMARY KEY ("user_correo","blocked_correo")
);

-- AddForeignKey
ALTER TABLE "Blocked" ADD CONSTRAINT "Blocked_user_correo_fkey" FOREIGN KEY ("user_correo") REFERENCES "User"("correo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocked" ADD CONSTRAINT "Blocked_blocked_correo_fkey" FOREIGN KEY ("blocked_correo") REFERENCES "blocked"("blockedCorreo") ON DELETE RESTRICT ON UPDATE CASCADE;
