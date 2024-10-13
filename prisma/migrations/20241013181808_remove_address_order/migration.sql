/*
  Warnings:

  - You are about to drop the column `address_id` on the `Order` table. All the data in the column will be lost.
  - Added the required column `authorization_url` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_address_id_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "address_id",
ADD COLUMN     "authorization_url" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
