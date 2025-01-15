ALTER TABLE "Smoke" ADD COLUMN "userId" TEXT NOT NULL;

INSERT INTO "User" (id, userId, createdAt)
VALUES ('default_user_id', 'default_user_id', NOW());

UPDATE "Smoke" SET "userId" = 'default_user_id' WHERE "userId" IS NULL;

ALTER TABLE "Smoke" ADD CONSTRAINT "Smoke_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE;
