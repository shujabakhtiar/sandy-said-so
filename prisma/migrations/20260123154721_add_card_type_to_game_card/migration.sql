-- CreateEnum
CREATE TYPE "GameCardType" AS ENUM ('PHASE_0', 'PHASE_1', 'PHASE_2', 'PHASE_3', 'PHASE_4', 'PHASE_5');

-- AlterTable
ALTER TABLE "GameCard" ADD COLUMN     "card_type" "GameCardType";
