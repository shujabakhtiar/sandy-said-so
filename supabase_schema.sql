-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('SINGLE_DECK', 'BUNDLE', 'SUBSCRIPTION');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentProvider" AS ENUM ('RAZORPAY', 'STRIPE');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELED', 'EXPIRED', 'PAST_DUE');

-- CreateEnum
CREATE TYPE "AffiliatePayoutStatus" AS ENUM ('PENDING', 'PAID');

-- CreateEnum
CREATE TYPE "GameCardType" AS ENUM ('PHASE_0', 'PHASE_1', 'PHASE_2', 'PHASE_3', 'PHASE_4', 'PHASE_5');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Face" (
    "id" SERIAL NOT NULL,
    "photo_id" INTEGER NOT NULL,
    "bounding_box" JSONB NOT NULL,
    "face_embedding" TEXT,

    CONSTRAINT "Face_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "FacePersonMap" (
    "id" SERIAL NOT NULL,
    "face_id" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "FacePersonMap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameMode" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GameMode_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "GameCard" (
    "id" SERIAL NOT NULL,
    "deck_id" INTEGER NOT NULL,
    "photo_id" INTEGER,
    "rule_text" TEXT NOT NULL,
    "order_index" INTEGER NOT NULL,
    "is_draft" BOOLEAN NOT NULL DEFAULT true,
    "card_type" "GameCardType",
    "target_person" TEXT,

    CONSTRAINT "GameCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sandy_chaos_cards" (
    "id" SERIAL NOT NULL,
    "game_mode_id" INTEGER NOT NULL,
    "rule_text" TEXT NOT NULL,
    "chaos_level" INTEGER NOT NULL,

    CONSTRAINT "sandy_chaos_cards_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "deck_id" INTEGER,
    "customer_email" TEXT,
    "address" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "affiliate_code" TEXT,
    "amount" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "payment_status" "PaymentStatus",
    "product_id" INTEGER,
    "provider" "PaymentProvider" NOT NULL DEFAULT 'RAZORPAY',
    "provider_order_id" TEXT,
    "provider_payment_id" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "game_mode_id" INTEGER,
    "deck_id" INTEGER,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "ProductType" NOT NULL,
    "price" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "order_id" INTEGER NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCredit" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'DECK_CREDIT',
    "balance" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCredit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Affiliate" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Affiliate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AffiliateEarning" (
    "id" SERIAL NOT NULL,
    "order_id" INTEGER NOT NULL,
    "affiliate_id" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "AffiliatePayoutStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AffiliateEarning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enlistments" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "enlistments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE INDEX "Photo_user_id_idx" ON "Photo"("user_id");

-- CreateIndex
CREATE INDEX "Face_photo_id_idx" ON "Face"("photo_id");

-- CreateIndex
CREATE INDEX "Person_user_id_idx" ON "Person"("user_id");

-- CreateIndex
CREATE INDEX "FacePersonMap_face_id_idx" ON "FacePersonMap"("face_id");

-- CreateIndex
CREATE INDEX "FacePersonMap_person_id_idx" ON "FacePersonMap"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "GameMode_name_key" ON "GameMode"("name");

-- CreateIndex
CREATE INDEX "GameDeck_user_id_idx" ON "GameDeck"("user_id");

-- CreateIndex
CREATE INDEX "GameDeck_game_mode_id_idx" ON "GameDeck"("game_mode_id");

-- CreateIndex
CREATE INDEX "GameCard_deck_id_idx" ON "GameCard"("deck_id");

-- CreateIndex
CREATE INDEX "sandy_chaos_cards_game_mode_id_idx" ON "sandy_chaos_cards"("game_mode_id");

-- CreateIndex
CREATE INDEX "AiGeneration_deck_id_idx" ON "AiGeneration"("deck_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_provider_order_id_key" ON "Order"("provider_order_id");

-- CreateIndex
CREATE INDEX "Order_user_id_idx" ON "Order"("user_id");

-- CreateIndex
CREATE INDEX "Order_product_id_idx" ON "Order"("product_id");

-- CreateIndex
CREATE INDEX "Order_provider_order_id_idx" ON "Order"("provider_order_id");

-- CreateIndex
CREATE INDEX "OrderItem_order_id_idx" ON "OrderItem"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_order_id_key" ON "Subscription"("order_id");

-- CreateIndex
CREATE INDEX "Subscription_user_id_idx" ON "Subscription"("user_id");

-- CreateIndex
CREATE INDEX "UserCredit_user_id_idx" ON "UserCredit"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_code_key" ON "Affiliate"("code");

-- CreateIndex
CREATE INDEX "Affiliate_user_id_idx" ON "Affiliate"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "AffiliateEarning_order_id_key" ON "AffiliateEarning"("order_id");

-- CreateIndex
CREATE INDEX "AffiliateEarning_affiliate_id_idx" ON "AffiliateEarning"("affiliate_id");

-- CreateIndex
CREATE UNIQUE INDEX "enlistments_email_key" ON "enlistments"("email");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Face" ADD CONSTRAINT "Face_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacePersonMap" ADD CONSTRAINT "FacePersonMap_face_id_fkey" FOREIGN KEY ("face_id") REFERENCES "Face"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacePersonMap" ADD CONSTRAINT "FacePersonMap_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameDeck" ADD CONSTRAINT "GameDeck_game_mode_id_fkey" FOREIGN KEY ("game_mode_id") REFERENCES "GameMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameDeck" ADD CONSTRAINT "GameDeck_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCard" ADD CONSTRAINT "GameCard_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "GameDeck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameCard" ADD CONSTRAINT "GameCard_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sandy_chaos_cards" ADD CONSTRAINT "sandy_chaos_cards_game_mode_id_fkey" FOREIGN KEY ("game_mode_id") REFERENCES "GameMode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiGeneration" ADD CONSTRAINT "AiGeneration_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "GameDeck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_affiliate_code_fkey" FOREIGN KEY ("affiliate_code") REFERENCES "Affiliate"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "GameDeck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_game_mode_id_fkey" FOREIGN KEY ("game_mode_id") REFERENCES "GameMode"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCredit" ADD CONSTRAINT "UserCredit_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliate" ADD CONSTRAINT "Affiliate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateEarning" ADD CONSTRAINT "AffiliateEarning_affiliate_id_fkey" FOREIGN KEY ("affiliate_id") REFERENCES "Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AffiliateEarning" ADD CONSTRAINT "AffiliateEarning_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
