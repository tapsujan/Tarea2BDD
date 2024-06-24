/*
  Warnings:

  - You are about to drop the `Blocked` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Blocked" DROP CONSTRAINT "Blocked_blockedCorreo_fkey";

-- DropForeignKey
ALTER TABLE "Blocked" DROP CONSTRAINT "Blocked_userCorreo_fkey";

-- DropTable
DROP TABLE "Blocked";

-- CreateTable
CREATE TABLE "blocked" (
    "id" SERIAL NOT NULL,
    "blockedCorreo" TEXT NOT NULL,

    CONSTRAINT "blocked_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlockedUser" (
    "user_correo" TEXT NOT NULL,
    "blocked_correo" TEXT NOT NULL,

    CONSTRAINT "BlockedUser_pkey" PRIMARY KEY ("user_correo","blocked_correo")
);

-- CreateIndex
CREATE UNIQUE INDEX "blocked_blockedCorreo_key" ON "blocked"("blockedCorreo");

-- AddForeignKey
ALTER TABLE "blocked" ADD CONSTRAINT "blocked_blockedCorreo_fkey" FOREIGN KEY ("blockedCorreo") REFERENCES "User"("correo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedUser" ADD CONSTRAINT "BlockedUser_user_correo_fkey" FOREIGN KEY ("user_correo") REFERENCES "User"("correo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockedUser" ADD CONSTRAINT "BlockedUser_blocked_correo_fkey" FOREIGN KEY ("blocked_correo") REFERENCES "blocked"("blockedCorreo") ON DELETE RESTRICT ON UPDATE CASCADE;
