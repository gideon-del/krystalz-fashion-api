/*
  Warnings:

  - A unique constraint covering the columns `[cart_size]` on the table `CartProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartProduct_cart_size_key" ON "CartProduct"("cart_size");
