-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "github_id" TEXT,
    "avatar" TEXT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "payload" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "latitude" REAL,
    "longitude" REAL
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "answer" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Recommendation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Wish" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Stream" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "message" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "streamId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "ChatRoom" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chat" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "chatRoomId" INTEGER NOT NULL,
    "isReservedAlarm" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "date" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" DATETIME NOT NULL,
    "kind" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "reviewCheckBoxes" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdForId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");

-- CreateIndex
CREATE UNIQUE INDEX "Token_payload_key" ON "Token"("payload");

-- CreateIndex
CREATE INDEX "Token_userId_idx" ON "Token"("userId");

-- CreateIndex
CREATE INDEX "Product_userId_idx" ON "Product"("userId");

-- CreateIndex
CREATE INDEX "Post_userId_idx" ON "Post"("userId");

-- CreateIndex
CREATE INDEX "Answer_userId_postId_idx" ON "Answer"("userId", "postId");

-- CreateIndex
CREATE INDEX "Recommendation_userId_postId_idx" ON "Recommendation"("userId", "postId");

-- CreateIndex
CREATE INDEX "Sale_userId_productId_idx" ON "Sale"("userId", "productId");

-- CreateIndex
CREATE INDEX "Purchase_userId_productId_idx" ON "Purchase"("userId", "productId");

-- CreateIndex
CREATE INDEX "Wish_userId_productId_idx" ON "Wish"("userId", "productId");

-- CreateIndex
CREATE INDEX "Stream_userId_idx" ON "Stream"("userId");

-- CreateIndex
CREATE INDEX "Message_userId_streamId_idx" ON "Message"("userId", "streamId");

-- CreateIndex
CREATE INDEX "ChatRoom_productId_userId_idx" ON "ChatRoom"("productId", "userId");

-- CreateIndex
CREATE INDEX "Chat_userId_chatRoomId_idx" ON "Chat"("userId", "chatRoomId");

-- CreateIndex
CREATE UNIQUE INDEX "Reservation_productId_key" ON "Reservation"("productId");

-- CreateIndex
CREATE INDEX "Reservation_userId_productId_idx" ON "Reservation"("userId", "productId");

-- CreateIndex
CREATE INDEX "Review_createdById_createdForId_productId_idx" ON "Review"("createdById", "createdForId", "productId");
