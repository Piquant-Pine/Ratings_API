const mongoose = require('mongoose');
mongoose.connect('mongod://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});
// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

let reviewSchema = new mongoose.Schema({
  product_id: {type: Number, required: true},
  results: [{
    review_id: {type: Number, required: true, unique: true},
    rating: Number,
    summary: String,
    recommend: Boolean,
    response: String,
    body: String,
    review_date: {type: Date, default: Date.now},
    reviewer_name: String,
    helpfulness: Number,
    photos: [{
      url: String
    }],
    reported: {type: Boolean, default: false},
    characteristic_ratings: [{
      fit: {characteristic_id: {type: Number, required: true, unique: true}, value: Number},
      length: {characteristic_id: {type: Number, required: true, unique: true}, value: Number},
      comfort: {characteristic_id: {type: Number, required: true, unique: true}, value: Number},
      quality: {characteristic_id: {type: Number, required: true, unique: true}, value: Number}
    }]
  }],
});

const Review = mongoose.model('Review', reviewSchema);

// module.exports = Review;
