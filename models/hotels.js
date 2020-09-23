const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: Number, // 1 à 5
    hasSpa: Boolean,
    hasPool: Boolean,
    priceCategory: Number, // 1 à 3
    created:{
        type:Date,
        default:Date.now
    }
});

const Hotels = mongoose.model ('Hotels', hotelsSchema);

module.exports = Hotels;