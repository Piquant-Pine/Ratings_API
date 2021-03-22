const utility = require('./utility.js');
const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})

const db = require('../SQL/connection.js');

app.get('/reviews', (req, res) => {
  let page;
  let count;

  if (!req.query.page) {
    page = 1;
  } else {
    page = req.query.page;
  }

  if (!req.query.count) {
    count = 5;
  } else {
    count = req.query.count;
  }

  let productId = req.query.product_id;

  db.query(`SELECT * FROM reviews LEFT OUTER JOIN photos ON reviews.review_id = photos.review WHERE product_id = ${productId}`, (error, reviews) => {
    if (error) {
      console.log('query error for /reviews based on product_id: ', error)
      res.sendStatus(400);
    } else {
      res.send(utility.organizeReviews(reviews, page, count, req.query.sort));
    }
  })
  // implement sort, page, and count functionality
  // implement filter for reported reviews
})

app.get('/reviews/meta', (req, res) => {
  let productId = req.query.product_id;
  
  let ratingSQLString = `SELECT rating, COUNT(*) AS count FROM reviews WHERE product_id = ${productId} GROUP BY rating ORDER BY rating`;
  let recommendSQLString = `SELECT recommend, COUNT(*) AS count FROM reviews WHERE product_id = ${productId} GROUP BY recommend`;
  let characteristicSQLString = `SELECT characteristics.characteristic, characteristics.characteristic_id, AVG(characteristic_reviews.characteristic_rating) AS avg FROM characteristics INNER JOIN characteristic_reviews ON characteristics.characteristic_id = characteristic_reviews.characteristic_id WHERE characteristics.product = ${productId} GROUP BY characteristics.characteristic, characteristics.characteristic_id`;
  
  db.query(ratingSQLString, (error, ratings) => {
    if (error) {
      console.log('query error for ratings based on product_id')
      res.sendStatus(400);
    } else {
      db.query(recommendSQLString, (error, recommends) => {
        if (error) {
          console.log('query error for recommends based on product_id')
          res.sendStatus(400);
        } else {
          db.query(characteristicSQLString, (error, characteristics) => {
            if (error) {
              console.log('query error for characteristics based on product_id')
              res.sendStatus(400);
            } else {
              res.send(utility.organizeMeta(productId, ratings, recommends, characteristics));
            }
          })
        }
      }) 
    }
  })
})

app.post('/reviews')

app.put('/reviews/:review_id/helpful', (req, res) => {
  let sqlString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = ${req.params.review_id}`
  db.query(sqlString, (error, results) => {
    if (error) {
      console.log('query error for marking review as helpful')
      res.sendStatus(400);
    } else {
      res.status(200).send('Marked as helpful!');
    }
  })
})

app.put('/reviews/:review_id/report', (req, res) => {
  let sqlString = `UPDATE reviews SET reported = 1 WHERE review_id = ${req.params.review_id}`
  db.query(sqlString, (error, results) =>  {
    if (error) {
      console.log('query error for reporting a review');
      res.sendStatus(400);
    } else {
      res.status(200).send('Reported!');
    }
  })
})