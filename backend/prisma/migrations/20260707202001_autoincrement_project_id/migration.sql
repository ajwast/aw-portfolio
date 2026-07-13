-- AlterTable
CREATE SEQUENCE project_projectid_seq;
ALTER TABLE "Project" ALTER COLUMN "projectId" SET DEFAULT nextval('project_projectid_seq');
ALTER SEQUENCE project_projectid_seq OWNED BY "Project"."projectId";
