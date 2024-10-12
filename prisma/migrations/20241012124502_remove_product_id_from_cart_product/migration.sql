/*
  Warnings:

  - You are about to drop the column `product_id` on the `CartProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_product_id_fkey";

-- AlterTable
ALTER TABLE "CartProduct" DROP COLUMN "product_id";
