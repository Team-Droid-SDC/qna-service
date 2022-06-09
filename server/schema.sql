DROP DATABASE qna;

CREATE DATABASE qna;

CREATE TABLE IF NOT EXISTS questions (
  id serial not null,
  product_id integer,
  question_body varchar(250),
  question_date bigint,
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
  answer_date bigint,
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

-- importing csv data to PostgresDB
copy questions from '/Users/altravolta/Documents/Code/rfp2204/qna-service/csv_data/questions.csv' delimiter ',' csv header;

copy answers from '/Users/altravolta/Documents/Code/rfp2204/qna-service/csv_data/answers.csv' delimiter ',' csv header;

copy photos from '/Users/altravolta/Documents/Code/rfp2204/qna-service/csv_data/answers_photos.csv' delimiter ',' csv header;


-- To run this file
-- psql postgres
-- \i '/Users/altravolta/Documents/Code/rfp2204/qna-service/server/schema.sql'





