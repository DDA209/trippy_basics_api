const express = require('express');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

const schema = {
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
};

const Schema = new mongoose.Schema(schema);
const HotelModel = mongoose.model ('Hotel', Schema);

mongoose.connect('mongodb://localhost:27017/trippy_api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (err !== null) {
        console.log('DB not connected with err:', err);
        return;
    }
    console.log('DB connected on port 27017')
});

// GET /hotels: start
app.get('/hotels', (req, res) => {
    console.log('GET /hotels');

    HotelModel.find((err, hotel) =>{

        if (err !==null) {
            console.log('An error occurred, err:', err);
            return;
        }

        res.json({
            success: true,
            date: hotel
        });

    });
});
// GET /hotels: end


// POST /hotels: start
app.post('/hotels', (req, res) => {
    console.log('POST /hotels');
    console.log('POST /hotels req.body:',req.body);
    
    const {
        name = '',
        address = '',
        city = '',
        country = '',
        stars = 1, // 1 à 5
        hasSpa = false,
        hasPool = false,
        priceCategory = 1, // 1 à 3
    } = req.body;

    if ( stars < 1 || stars > 5 ) {
        console.log('Error: star number error', stars);
        return
    };

    if ( isNaN(stars) ) {
        console.log('Error: stars NaN', stars);
        return
    };

    if ( priceCategory < 1 || priceCategory > 5 ) {
        console.log('Error: price categorie range error', priceCategory);
        return
    };

    if ( isNaN(priceCategory) ) {
        console.log('Error: price categorie NaN', priceCategory);
        return
    };

    hotel = new HotelModel({
        name,
        address,
        city,
        country,
        stars,
        hasSpa,
        hasPool,
        priceCategory
    });

    hotel.save((err, hotel) =>{
        
        if (err !==null) {
            console.log('An error occurred, err:', err);
            return;
        }; 
        
        res.json({
            success: true,
            date: hotel
        });

    });
});
// POST /hotels: end













app.listen(port, () => {
    console.log(`Server connected on port: ${port}`);
});