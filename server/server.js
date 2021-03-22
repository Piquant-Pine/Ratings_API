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
      // res.send(reviews);
    }
  })

  // extract request params from GET request (DONE)
  // invoke query to grab all the necessary reviews data that needs to be sent back to client (DONE)
  // invoke utility helper function to restructure response data from db (REFACTORING)
  // send data back to client (DONE)
})

app.get('/reviews/meta')

app.post('/reviews')

app.put('/reviews/review_id:/helpful')

app.put('/reviews/review_id:/report')