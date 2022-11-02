CREATE DATABASE "giphy_search_favorites";

-- Each favorite image can be assigned 1 of the following categories as a Foreign Key

-- Category table
CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');

-- Favorites table
CREATE TABLE "favorites" (
	"id" SERIAL PRIMARY KEY,
	"giphy_id" VARCHAR (120) NOT NULL,
	"category_id" integer REFERENCES category,
    "giphy_url" VARCHAR (400) NOT NULL
);


