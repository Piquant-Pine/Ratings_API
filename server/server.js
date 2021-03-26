const utility = require('./utility.js');
const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})

const db = require('../db/connection.js');

app.get('/reviews', (req, res) => {
  console.log('LOGGING THE REQ QUERY: ', req.query);
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
  console.log('LOGGING THE REQ QUERY: ', req.query);
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

// app.post('/reviews', (req, res) => {
//   let recommend;
//   if (req.query.recommend === true) {
//     recommend = 1;
//   } else if (req.query.recommend === false) {
//     recommend = 0;
//   }

//   let reviewsSQLString = `INSERT INTO reviews (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email) VALUES (${req.query.product_id}, ${req.query.rating}, ${req.query.summary}, ${req.query.body}, ${recommend}, ${req.query.name}, ${req.query.email})`;
//   db.query(reviewsSQLString, (error, results) => {
//     if (error) {
//       console.log('query error for inserting into reviews table')
//       res.sendStatus(400);
//     } else {
//       let photosSQLString = `INSERT INTO photos (review, url_link) VALUES (`
//       for (let i = 0; i < req.query.photos.length; i++) {
//         if (i !== req.query.photos.length - 1) {
//           photosSQLString += `(${results.insertId}, ${req.query.photos[i]}), `
//         } else {
//           photosSQLString += `(${results.insertId}, ${req.query.photos[i]}))`
//         }
//         // IDEA BEFORE BED - instead of making so many queries, just use the for loop to concat & prepare the query based on photo array length
//       }
//       db.query(photosSQLString, (error, photos) => {
//         if (error) {
//           console.log('querry error for inserting into reviews table')
//           res.status(400);
//         } else {
//           let characteristicsSQLString = `INSERT INTO characteristics_reviews (characteristic_id, review, characteristic_rating) VALUES (`
//           for (let key in req.query.characteristics) {
//             characteristicsSQLString += `(${Number(key)}, ${results.insertId}, ${req.query.characteristics[key]})`
//           }
//           characteristicsSQLString += `)`;
//           db.query(characteristicsSQLString, (error, characteristics) => {
//             if (error) {
//               console.log('query error for inserting into characteristic reviews table')
//               res.status(201).send('Review posted!');
//             }
//           })
//         }
//       })
//     }
//   })
// })

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