var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/books');

module.exports = mongoose;