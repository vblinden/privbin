-- CreateTable
CREATE TABLE "items" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "exposure" TEXT NOT NULL DEFAULT E'never',
    "language" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "has_password" BOOLEAN NOT NULL DEFAULT false,
    "created_at" BIGINT NOT NULL,
    "expire_at" BIGINT,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);
