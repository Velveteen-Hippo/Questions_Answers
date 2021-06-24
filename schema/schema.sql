-- psql -U postgres -h 127.0.0.1 -d qanda -f ./schema/schema.sql;

-- psql -U postgres -d qanda;

-- Show tables:
-- \dt

-- DROP DATABASE IF EXISTS qanda;

-- CREATE DATABASE qanda;

DROP TABLE IF EXISTS questions CASCADE;

CREATE TABLE questions (
   id SERIAL PRIMARY KEY,
   product_id INT,
   body VARCHAR(1000) NOT NULL,
   date_written BIGINT,
   asker_name VARCHAR(60) NOT NULL,
   asker_email VARCHAR(60) NOT NULL,
   reported BOOLEAN,
   helpful INT
);

DROP TABLE IF EXISTS answers CASCADE;

CREATE TABLE answers (
   id SERIAL PRIMARY KEY,
   question_id INT,
   body VARCHAR(1000) NOT NULL,
   date_written BIGINT,
   answerer_name VARCHAR(60) NOT NULL,
   answerer_email VARCHAR(60) NOT NULL,
   reported BOOLEAN,
   helpful INT,
   CONSTRAINT fk_questions_id
      FOREIGN KEY (question_id)
         REFERENCES questions(id)
         ON DELETE CASCADE
);

DROP TABLE IF EXISTS answers_photos CASCADE;

CREATE TABLE answers_photos (
   id SERIAL PRIMARY KEY,
   answer_id INT,
   url VARCHAR (1024) NOT NULL,
   CONSTRAINT fk_answers_id
      FOREIGN KEY (answer_id)
         REFERENCES answers(id)
         ON DELETE CASCADE
);



-- qanda=# SELECT to_timestamp(1599958385988::double precision /1000);
--         to_timestamp
-- ----------------------------
--  2020-09-12 18:53:05.988-06
-- (1 row)

-- qanda=# SELECT timestamp '1970-01-01 00:00:00' + interval '1599958385 second';
--       ?column?
-- ---------------------
--  2020-09-13 00:53:05
-- (1 row)


-- date_written DATE NOT NULL DEFAULT CURRENT_DATE