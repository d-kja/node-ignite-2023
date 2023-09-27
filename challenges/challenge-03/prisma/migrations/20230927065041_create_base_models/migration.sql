-- CreateEnum
CREATE TYPE "PET_AGE" AS ENUM ('NEW', 'NEUTRAL', 'OLD');

-- CreateEnum
CREATE TYPE "PET_SIZE" AS ENUM ('SMOL', 'NORMAL', 'LARGE');

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],
    "age" "PET_AGE" NOT NULL DEFAULT 'NEUTRAL',
    "size" "PET_SIZE" NOT NULL DEFAULT 'NORMAL',
    "energy" INTEGER NOT NULL,
    "independence" INTEGER NOT NULL,
    "isClaustrophobic" BOOLEAN NOT NULL,
    "otherRequirements" TEXT[],
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organizations_email_key" ON "organizations"("email");
