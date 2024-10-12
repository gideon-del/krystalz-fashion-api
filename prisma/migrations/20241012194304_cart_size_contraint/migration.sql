/*
  Warnings:

  - A unique constraint covering the columns `[cart_id,size_id]` on the table `CartProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CartProduct_size_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "CartProduct_cart_id_size_id_key" ON "CartProduct"("cart_id", "size_id");
