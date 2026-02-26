CREATE TABLE "questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"type" varchar(100) NOT NULL,
	"description" text,
	"timeout" integer DEFAULT 30 NOT NULL,
	"choices" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"question" text NOT NULL
);
