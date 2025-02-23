CREATE TYPE "public"."status" AS ENUM('ACTIVE', 'CANCELLED', 'USED');--> statement-breakpoint
ALTER TABLE "event_participants" ADD COLUMN "status" "status" DEFAULT 'ACTIVE';