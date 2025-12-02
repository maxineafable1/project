CREATE TABLE `bodyweights` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`weight` numeric NOT NULL,
	`exercise_date` text DEFAULT (current_timestamp) NOT NULL,
	`is_kilogram` integer NOT NULL,
	`user_id` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bodyweights_exercise_date_unique` ON `bodyweights` (`exercise_date`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`weight` numeric NOT NULL,
	`sets` integer NOT NULL,
	`reps` integer NOT NULL,
	`exercise_date` text DEFAULT (current_timestamp) NOT NULL,
	`is_kilogram` integer NOT NULL,
	`user_id` text,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_exercises`("id", "name", "weight", "sets", "reps", "exercise_date", "is_kilogram", "user_id", "created_at", "updated_at") SELECT "id", "name", "weight", "sets", "reps", "exercise_date", "is_kilogram", "user_id", "created_at", "updated_at" FROM `exercises`;--> statement-breakpoint
DROP TABLE `exercises`;--> statement-breakpoint
ALTER TABLE `__new_exercises` RENAME TO `exercises`;--> statement-breakpoint
PRAGMA foreign_keys=ON;