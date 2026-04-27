-- CreateTable
CREATE TABLE "Project" (
    "projectId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectId")
);
