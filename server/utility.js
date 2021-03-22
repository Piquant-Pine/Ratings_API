module.exports = {
  organizeReviews: function (reviews, page, count, sort) {
    console.log('hello there');
    let reviewsData = {};
    
    reviewsData['product'] = reviews[0].product_id;
    reviewsData['page'] = page;
    reviewsData['count'] = count;

    let resultsArray = [];
    for (let i = 0; i < reviews.length; i++) {


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
  }
}