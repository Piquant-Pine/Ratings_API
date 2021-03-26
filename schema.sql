DROP DATABASE IF EXISTS ratings;

CREATE DATABASE ratings;

USE ratings;

CREATE TABLE reviews
(
  review_id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  rating SMALLINT NOT NULL,
  review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  summary VARCHAR(1000) NOT NULL,
  body VARCHAR(5000) NOT NULL,
  recommend TINYINT(1) NOT NULL DEFAULT '0',
  reported TINYINT(1) NOT NULL DEFAULT '0',
  reviewer_name VARCHAR(30) NOT NULL,
  reviewer_email VARCHAR(50) NOT NULL,
  response VARCHAR(5000) DEFAULT NULL,
  helpfulness INT NOT NULL DEFAULT '0',
  PRIMARY KEY (review_id),
  INDEX (product_id)
);

LOAD DATA LOCAL INFILE './ETL/Transformed/reviews-transformed.csv' INTO TABLE reviews
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(review_id, product_id, rating, @date, summary, body, @recommend, @reported, reviewer_name, reviewer_email, response, helpfulness)
SET review_date = STR_TO_DATE(@date, '%Y-%m-%d'),
    recommend = (@recommend = 'true'),
    reported = (@reported = 'true')
;

CREATE TABLE photos
(
  photo_id INT NOT NULL AUTO_INCREMENT,
  review INT NOT NULL,
  url_link VARCHAR(5000) NOT NULL,
  PRIMARY KEY (photo_id),
  FOREIGN KEY (review)
    REFERENCES reviews (review_id)
    ON DELETE CASCADE
);

LOAD DATA LOCAL INFILE './ETL/Transformed/photos-transformed.csv' INTO TABLE photos
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(photo_id, review, url_link)
;

CREATE TABLE characteristics
(
  characteristic_id INT NOT NULL AUTO_INCREMENT,
  product INT NOT NULL,
  characteristic VARCHAR(30) NOT NULL,
  PRIMARY KEY (characteristic_id),
  INDEX (product)
);

LOAD DATA LOCAL INFILE './ETL/Transformed/characteristics-transformed.csv' INTO TABLE characteristics
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(characteristic_id, product, characteristic)
;

CREATE TABLE characteristic_reviews
(
  characteristic_rating_id INT NOT NULL AUTO_INCREMENT,
  characteristic_id INT NOT NULL,
  review INT NOT NULL,
  characteristic_rating SMALLINT NOT NULL,
  PRIMARY KEY (characteristic_rating_id),
  FOREIGN KEY (characteristic_id)
    REFERENCES characteristics (characteristic_id)
    ON DELETE CASCADE,
  FOREIGN KEY (review)
    REFERENCES reviews (review_id)
    ON DELETE CASCADE
);

LOAD DATA LOCAL INFILE './ETL/Transformed/charReviews-transformed.csv' INTO TABLE characteristic_reviews
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(characteristic_rating_id, characteristic_id, review, characteristic_rating)
;
