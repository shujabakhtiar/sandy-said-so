-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "AiGeneration" (
    "id" SERIAL NOT NULL,
    "deck_id" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "model" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Face" (
    "id" SERIAL NOT NULL,
    "photo_id" INTEGER NOT NULL,
    "bounding_box" JSONB NOT NULL,
    "face_embedding" TEXT,

    CONSTRAINT "Face_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacePersonMap" (
    "id" SERIAL NOT NULL,
    "face_id" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "FacePersonMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameCard" (
    "id" SERIAL NOT NULL,
    "deck_id" INTEGER NOT NULL,
    "photo_id" INTEGER,
    "rule_text" TEXT NOT NULL,
    "order_index" INTEGER NOT NULL,
    "is_draft" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "GameCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameDeck" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "game_mode_id" INTEGER NOT NULL,
    "title" TEXT,
    "notes" TEXT,
    "goal" TEXT,
    "secrets" TEXT,
    "extra" TEXT,
    "chaos_level" INTEGER NOT NULL DEFAULT 3,
    "use_images" BOOLEAN NOT NULL DEFAULT false,
    "is_saved" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameDeck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameMode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GameMode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "deck_id" INTEGER NOT NULL,
    "customer_email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Person" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sandy_chaos_cards" (
    "id" SERIAL NOT NULL,
    "game_mode_id" INTEGER NOT NULL,
    "rule_text" TEXT NOT NULL,
    "chaos_level" INTEGER NOT NULL,

    CONSTRAINT "sandy_chaos_cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AiGeneration_deck_id_idx" ON "AiGeneration"("deck_id");

-- CreateIndex
CREATE INDEX "Face_photo_id_idx" ON "Face"("photo_id");

-- CreateIndex
CREATE INDEX "FacePersonMap_face_id_idx" ON "FacePersonMap"("face_id");

-- CreateIndex
CREATE INDEX "FacePersonMap_person_id_idx" ON "FacePersonMap"("person_id");

-- CreateIndex
CREATE INDEX "GameCard_deck_id_idx" ON "GameCard"("deck_id");

-- CreateIndex
CREATE INDEX "GameDeck_game_mode_id_idx" ON "GameDeck"("game_mode_id");

-- CreateIndex
CREATE INDEX "GameDeck_user_id_idx" ON "GameDeck"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "GameMode_name_key" ON "GameMode"("name");

-- CreateIndex
CREATE INDEX "Order_customer_email_idx" ON "Order"("customer_email");

-- CreateIndex
CREATE INDEX "Order_deck_id_idx" ON "Order"("deck_id");

-- CreateIndex
CREATE INDEX "Person_user_id_idx" ON "Person"("user_id");

-- CreateIndex
CREATE INDEX "Photo_user_id_idx" ON "Photo"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "sandy_chaos_cards_game_mode_id_idx" ON "sandy_chaos_cards"("game_mode_id");

-- AddForeignKey
ALTER TABLE "AiGeneration" ADD CONSTRAINT "AiGeneration_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "GameDeck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Face" ADD CONSTRAINT "Face_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacePersonMap" ADD CONSTRAINT "FacePersonMap_face_id_fkey" FOREIGN KEY ("face_id") REFERENCES "Face"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacePersonMap" ADD CONSTRAINT "FacePersonMap_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCard" ADD CONSTRAINT "GameCard_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "GameDeck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCard" ADD CONSTRAINT "GameCard_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameDeck" ADD CONSTRAINT "GameDeck_game_mode_id_fkey" FOREIGN KEY ("game_mode_id") REFERENCES "GameMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameDeck" ADD CONSTRAINT "GameDeck_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "GameDeck"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sandy_chaos_cards" ADD CONSTRAINT "sandy_chaos_cards_game_mode_id_fkey" FOREIGN KEY ("game_mode_id") REFERENCES "GameMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

