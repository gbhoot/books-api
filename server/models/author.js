var mongoose = require('../config/mongoose.js');
var validators = require('mongoose-validators');
var BookSchema = require('./book.js').schema;

var AuthorSchema = new mongoose.Schema({
    firstName: {type: String, required: true, 
        validate: [validators.isAlpha(), validators.isLength(2)]},
    lastName: {type: String, required: true,
        validate: [validators.isAlpha(), validators.isLength(2)]},
    birthCountry: {type: String, required: true, 
        validate: [validators.isAlpha(), validators.isLength(3)]},
    birthdate: {type: Date, validate: validators.isBefore(Date.now())},
    books: [BookSchema],
}, {timestamps: true});

var Authors = mongoose.model('Author', AuthorSchema);

module.exports = Authors;