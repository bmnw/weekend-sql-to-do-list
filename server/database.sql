-- create table of tasks
CREATE TABLE tasks (
	"id" serial PRIMARY KEY,
	"task_description" varchar(200),
	"complete" boolean
);

-- insert a new task
INSERT INTO "tasks" ("task_description", "complete")
VALUES ('week wack', false);

-- mark a task as completed
UPDATE "tasks" SET "complete" = true WHERE "id"=1;

-- delete a task by id
DELETE FROM "tasks" WHERE "id" = 1;