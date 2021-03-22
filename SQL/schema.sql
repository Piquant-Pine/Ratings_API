DROP DATABASE IF EXISTS ratings;

CREATE DATABASE ratings;

USE ratings;

/* Need to update date format specifications */
/* question about how to reference product_id from a table that doesn't exist in this service API schema? */
/* UPDATE INDEXES - CREATE INDEX product_id ON reviews (product_id) */
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

CREATE TABLE characteristics
(
  characteristic_id INT NOT NULL AUTO_INCREMENT,
  product INT NOT NULL,
  characteristic VARCHAR(30) NOT NULL,
  PRIMARY KEY (characteristic_id)
);

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
