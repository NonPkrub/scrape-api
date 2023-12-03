-- CreateTable
CREATE TABLE "configs" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "cronjob" TEXT,
    "url" TEXT NOT NULL,
    "dataset" INTEGER NOT NULL,
    "format" TEXT,
    "name" TEXT,
    "data" INTEGER NOT NULL,

    CONSTRAINT "configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "selectors" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),
    "selector" TEXT NOT NULL,

    CONSTRAINT "selectors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "configs" ADD CONSTRAINT "configs_data_fkey" FOREIGN KEY ("data") REFERENCES "selectors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
