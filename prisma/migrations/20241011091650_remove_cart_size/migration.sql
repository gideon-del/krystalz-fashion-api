/*
  Warnings:

  - You are about to drop the column `cart_size` on the `CartProduct` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the `CartSize` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quantity` to the `CartProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size_id` to the `CartProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size_id` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sold_quantity` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_cart_size_fkey";

-- DropForeignKey
ALTER TABLE "CartSize" DROP CONSTRAINT "CartSize_size_id_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_size_fkey";

-- DropIndex
DROP INDEX "CartProduct_cart_size_key";

-- AlterTable
ALTER TABLE "CartProduct" DROP COLUMN "cart_size",
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "size_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "size",
ADD COLUMN     "size_id" TEXT NOT NULL,
ADD COLUMN     "sold_quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "CartSize";

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
