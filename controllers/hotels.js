const express = require('express');
const { get } = require('mongoose');
const router = express.Router();

const Hotels = require('../models/hotels')

const app = express ();

router.get('/', (req, res) => {
    Hotels
});