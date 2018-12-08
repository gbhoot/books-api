var mongoose = require('../config/mongoose.js');
var validators = require('mongoose-validators');

var BookSchema = new mongoose.Schema({
    title: {type: String, required: true, minLength: 2},
    publicationYear: {type: Number, required: true, max: 2018,
        validate: validators.isNumeric()},
    author: String,
}, {timestamps: true});

var Books = mongoose.model('Book', BookSchema);

module.exports = Books;
