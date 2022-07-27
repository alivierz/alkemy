CREATE TABLE "characters" (
  "character_id" SERIAL PRIMARY KEY,
  "name" varchar DEFAULT 'Anonymous',
  "age" int NOT NULL,
  "image" varchar NOT NULL,
  "history" varchar NOT NULL,
  "weight" float NOT NULL
);

CREATE TABLE "peliculas_series" (
  "pelis_id" SERIAL PRIMARY KEY,
  "title" varchar NOT NULL,
  "created" varchar NOT NULL,
  "calification" float NOT NULL,
  "image" varchar
);

CREATE TABLE "genders" (
  "genders_id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "image" varchar DEFAULT 'image'
);

CREATE TABLE "group_movies" (
  "group_id" SERIAL PRIMARY KEY,
  "character_rel" int NOT NULL,
  "peli_rel" int NOT NULL
);

CREATE TABLE "group_genders" (
  "group_genders_id" SERIAL PRIMARY KEY,
  "peli_rel" int NOT NULL,
  "gender_rel" int NOT NULL
);

CREATE TABLE "users" (
  "user_id" uuid PRIMARY KEY,
  "name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL
);

ALTER TABLE "group_movies" ADD FOREIGN KEY ("character_rel") REFERENCES "characters" ("character_id");

ALTER TABLE "group_movies" ADD FOREIGN KEY ("peli_rel") REFERENCES "peliculas_series" ("pelis_id");

ALTER TABLE "group_genders" ADD FOREIGN KEY ("gender_rel") REFERENCES "genders" ("genders_id");

ALTER TABLE "group_genders" ADD FOREIGN KEY ("peli_rel") REFERENCES "peliculas_series" ("pelis_id");
