/*
  Warnings:

  - A unique constraint covering the columns `[size_id]` on the table `CartProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CartProduct_size_id_key" ON "CartProduct"("size_id");
