-- CreateTable
CREATE TABLE "Blocked" (
    "id" SERIAL NOT NULL,
    "userCorreo" TEXT NOT NULL,
    "correoId" INTEGER NOT NULL,

    CONSTRAINT "Blocked_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blocked" ADD CONSTRAINT "Blocked_userCorreo_fkey" FOREIGN KEY ("userCorreo") REFERENCES "User"("correo") ON DELETE RESTRICT ON UPDATE CASCADE;
