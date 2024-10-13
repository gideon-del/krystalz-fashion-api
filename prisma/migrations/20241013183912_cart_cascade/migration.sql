-- DropForeignKey
ALTER TABLE "CartProduct" DROP CONSTRAINT "CartProduct_cart_id_fkey";

-- AddForeignKey
ALTER TABLE "CartProduct" ADD CONSTRAINT "CartProduct_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
