USE ratings;

LOAD DATA LOCAL INFILE '../Extract/reviews.csv' INTO TABLE reviews
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(review_id, product_id, rating, @date, summary, body, @recommend, @reported, reviewer_name, reviewer_email, response, helpfulness)
SET review_date = STR_TO_DATE(@date, '%Y-%m-%d'),
    recommend = (@recommend = 'true'),
    reported = (@reported = 'true')
;

LOAD DATA LOCAL INFILE '../Extract/reviews_photos.csv' INTO TABLE photos
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(photo_id, review, url_link)
;

LOAD DATA LOCAL INFILE '../Extract/characteristics.csv' INTO TABLE characteristics
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(characteristic_id, product, characteristic)
;

LOAD DATA LOCAL INFILE '../Extract/characteristic_reviews.csv' INTO TABLE characteristic_reviews
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(characteristic_rating_id, characteristic_id, review, characteristic_rating)
;