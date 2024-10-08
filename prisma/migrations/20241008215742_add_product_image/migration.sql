-- CreateTable
CREATE TABLE "ProductImages" (
    "id" TEXT NOT NULL,
    "image_url" TEXT,
    "produc_id" TEXT NOT NULL,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_produc_id_fkey" FOREIGN KEY ("produc_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
