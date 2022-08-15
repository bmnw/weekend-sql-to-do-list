-- create database table to contain the added tasks
CREATE TABLE tasks (
	"id" serial PRIMARY KEY,
	"task_description" varchar(200),
	"complete" boolean DEFAULT false,
	"date_submitted" date,
	"due_date" date,
	"priority" varchar(10),
	"todays_date" date DEFAULT CURRENT_DATE,
	"overdue" boolean DEFAULT false
);