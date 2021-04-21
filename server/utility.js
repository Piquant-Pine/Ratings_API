module.exports = {
  organizeReviews: function (reviews, page, count, sort) {
    let reviewsData = {};
    
    // reviewsData['product'] = reviews[0].product_id;
    // reviewsData['page'] = page;
    // reviewsData['count'] = count;

    let resultsArray = [];
    for (let i = 0; i < reviews.length; i++) {
      let additionalPhoto = false;
      for (let j = 0; j < resultsArray.length; j++) {
        if (resultsArray[j].review_id === reviews[i].review_id) {
          resultsArray[j]['photos'].push({
            id: reviews[i].photo_id,
            url: reviews[i].url_link
          })
          additionalPhoto = true;
        }
      }
      if (additionalPhoto) {
        continue;
      }

      let currentReview = {};
      currentReview['review_id'] = reviews[i].review_id;
      currentReview['rating'] = reviews[i].rating;
      currentReview['summary'] = reviews[i].summary;
      if (reviews[i].recommend === 1) {
        currentReview['recommend'] = true;
      } else if (reviews[i].recommend === 0) {
        currentReview['recommend'] = false;
      }
      if (reviews[i].response === '') {
        currentReview['response'] = null;
      } else {
        currentReview['response'] = reviews[i].response;
      }
      currentReview['body'] = reviews[i].body;
      currentReview['date'] = reviews[i].review_date;
      currentReview['reviewer_name'] = reviews[i].reviewer_name;
      currentReview['helpfulness'] = reviews[i].helpfulness;
      if (reviews[i].photo_id === null) {
        currentReview['photos'] = [];
      } else {
        currentReview['photos'] = [{
          id: reviews[i].photo_id,
          url: reviews[i].url_link
        }];
      }
      resultsArray.push(currentReview);
    }
    reviewsData['results'] = resultsArray;
    // invoke count, page, and sort helper functions
    return reviewsData;
  },

  organizeMeta: function(productId, ratings, recommends, characteristics) {
    let metaData = {};
    metaData['product_id'] = productId;
    let ratingsObj = {};
    let recommendsObj = {};
    let characteristicsObj = {};

    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i]['rating'] === 1) {
        ratingsObj['1'] = ratings[i]['count'].toString();
      } else if (ratings[i]['rating'] === 2) {
        ratingsObj['2'] = ratings[i]['count'].toString();
      } else if (ratings[i]['rating'] === 3) {
        ratingsObj['3'] = ratings[i]['count'].toString();
      } else if (ratings[i]['rating'] === 4) {
        ratingsObj['4'] = ratings[i]['count'].toString();
      } else if (ratings[i]['rating'] === 5) {
        ratingsObj['5'] = ratings[i]['count'].toString();
      }
    }
    metaData['ratings'] = ratingsObj;

    for (let j = 0; j < recommends.length; j++) {
      if (recommends[j]['recommend'] === 0) {
        recommendsObj['false'] = recommends[j]['count'].toString();
      } else if (recommends[j]['recommend'] === 1) {
        recommendsObj['true'] = recommends[j]['count'].toString();
      }
    }
    metaData['recommended'] = recommendsObj;

    for (let k = 0; k < characteristics.length; k++) {
      if (characteristics[k]['characteristic'] === "\"Fit\"") {
        characteristicsObj['Fit'] = {
          id: characteristics[k]['characteristic_id'],
          value: characteristics[k]['avg'].toString()
        }
      } else if (characteristics[k]['characteristic'] === "\"Length\"") {
        characteristicsObj['Length'] = {
          id: characteristics[k]['characteristic_id'],
          value: characteristics[k]['avg'].toString()
        }
      } else if (characteristics[k]['characteristic'] === "\"Comfort\"") {
        characteristicsObj['Comfort'] = {
          id: characteristics[k]['characteristic_id'],
          value: characteristics[k]['avg'].toString()
        }
      } else if (characteristics[k]['characteristic'] === "\"Quality\"") {
        characteristicsObj['Quality'] = {
          id: characteristics[k]['characteristic_id'],
          value: characteristics[k]['avg'].toString()
        }
      }
    }
    metaData['characteristics'] = characteristicsObj;
    return metaData;
  }
}