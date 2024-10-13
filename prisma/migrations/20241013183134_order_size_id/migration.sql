/*
  Warnings:

  - You are about to drop the column `product_id` on the `Orders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_product_id_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "product_id";
