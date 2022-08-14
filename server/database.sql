-- create table of tasks
CREATE TABLE tasks (
	"id" serial PRIMARY KEY,
	"task_description" varchar(200),
	"complete" boolean DEFAULT false,
	"date_submitted" date,
	"due_date" date,
	"priority" varchar(10),
	"todays_date" date DEFAULT CURRENT_DATE;
	"overdue" boolean DEFAULT false
);

-- insert a new task
INSERT INTO "tasks" ("task_description", "complete")
VALUES ('week wack', false);

-- mark a task as completed
UPDATE "tasks" SET "complete" = true WHERE "id"=1;

-- delete a task by id
DELETE FROM "tasks" WHERE "id" = 1;