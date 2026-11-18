-- ALLOW-DESTRUCTIVE: image bytes now live in the vibecamp-prod-myvc Spaces bucket at images/<image_id> (copied and verified by MD5 on 2026-11-18), and Spaces stores each object's content type
ALTER TABLE image DROP COLUMN data;
--> statement-breakpoint
ALTER TABLE image DROP COLUMN content_type;
