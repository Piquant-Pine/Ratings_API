DROP DATABASE IF EXISTS ratings;

CREATE DATABASE ratings;

/* Need to update date format specifications */
/* question about how to reference product_id from a table that doesn't exist in this service API schema? */
CREATE TABLE reviews
(
  review_id INT NOT NULL AUTO_INCREMENT
  rating INT NOT NULL
  summary VARCHAR(1000) NOT NULL
  recommend TINYINT(1) NOT NULL
  response VARCHAR(10000)
  body VARCHAR(10000) NOT NULL
  review_date DATE NOT NULL
  reviewer_name VARCHAR(30)
  helpfulness INT NOT NULL
  reported TINYINT(1) NOT NULL
  product_id INT NOT NULL
  PRIMARY KEY review_id
  FOREIGN KEY product_id
);

CREATE TABLE photos
(
  photo_id INT NOT NULL AUTO_INCREMENT
  url_link VARCHAR(5000) NOT NULL
  review_id INT NOT NULL
  PRIMARY KEY photo_id
  FOREIGN KEY review_id
    REFERENCES reviews (review_id)
    ON DELETE CASCADE
);

CREATE TABLE characteristics
(
  characteristic_id INT NOT NULL AUTO_INCREMENT
  characteristic_rating INT NOT NULL
  review_id INT NOT NULL
  PRIMARY KEY characteristic_id
  FOREIGN KEY review_id
    REFERENCES reviews (review_id)
    ON DELETE CASCADE
);