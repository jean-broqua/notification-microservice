-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "recipiantId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "readAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Notification_recipiantId_idx" ON "Notification"("recipiantId");
