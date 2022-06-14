DROP DATABASE If EXISTS qna;

CREATE DATABASE qna;

\c qna;

DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS questions;

CREATE TABLE IF NOT EXISTS questions (
  id serial not null,
  product_id integer,
  question_body varchar(250),
  question_date BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP),
  asker_name varchar(60),
  asker_email varchar(60),
  reported boolean default false,
  helpful integer default 0,
  primary key (id)
);

CREATE TABLE IF NOT EXISTS answers (
  id serial not null,
  question_id integer,
  body varchar(1000),
  answer_date BIGINT NOT NULL DEFAULT EXTRACT(EPOCH FROM CURRENT_TIMESTAMP),
  answerer_name varchar(60),
  answerer_email varchar(60),
  reported boolean default false,
  helpful integer default 0,
  primary key (id),
  constraint fk_question
    foreign key (question_id)
      references questions(id)
        on delete cascade
);

CREATE TABLE IF NOT EXISTS photos (
  id serial not null,
  answer_id integer,
  url varchar(1000),
  primary key (id),
  constraint fk_answer
    foreign key (answer_id)
      references answers(id)
      on delete cascade
);

-- ETL, importing csv data to PostgresDB
COPY questions FROM '/Users/altravolta/Documents/Code/rfp2204/qna-service/csv_files/questions.csv' delimiter ',' csv header;

COPY answers FROM '/Users/altravolta/Documents/Code/rfp2204/qna-service/csv_files/answers.csv' delimiter ',' csv header;

COPY photos FROM '/Users/altravolta/Documents/Code/rfp2204/qna-service/csv_files/answers_photos.csv' delimiter ',' csv header;

-- indexing for performance
CREATE INDEX questions_product_id_idx
ON questions (product_id);

CREATE INDEX answers_question_id_idx
ON answers (question_id);

CREATE INDEX photos_answer_id_idx
ON photos (answer_id);


-- Updating all the primary keys for serial sequence
SELECT setval(pg_get_serial_sequence('questions', 'id'), max(id)) FROM questions;
SELECT setval(pg_get_serial_sequence('answers', 'id'), max(id)) FROM answers;
SELECT setval(pg_get_serial_sequence('photos', 'id'), max(id)) FROM photos;

-- To run this file
-- psql postgres
-- \i '/Users/altravolta/Documents/Code/rfp2204/qna-service/server/schema.sql'





