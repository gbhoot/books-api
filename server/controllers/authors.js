var Author = require('../models/author.js');
var books = require('./books.js');

module.exports = {
    getAll: function(req, res) {
        Author.find({}, function(error, authors) {
            if (error) {
                console.log("There was an issue: ", error);
            } else {
                let response = {
                    message: "Success",
                    authors: authors
                };
                res.json(response);
            }
        });
    },

    getOne: function(req, res) {
        let aid = req.params.id;
        console.log(aid);
        Author.find({_id: aid}, function(error, author) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    author: author
                };
                res.json(response);
            }
        });
    },

    create: function(req, res) {
        let inc_auth = req.body;
        let author = new Author(inc_auth);
        author.save(function(error, new_author) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                res.json(new_author);
            }
        });
    },

    update: function(req, res) {
        let aid = req.params.id;
        let authorD = req.body;
        authorD.updated_at = Date.now();
        Author.updateOne({_id: aid}, {$set: authorD}, function(error, author) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    author: author
                }
                res.json(response);
            }
        });
    },

    destroy: function(req, res) {
        let aid = req.params.id;
        Author.find({_id: aid}, function(error, author) {
            let books = author['books'];
            for (count in books) {
                let bid = books[count]['_id'];
                books.delete(bid, function(response) {
                    console.log(response);
                });
            };
            Author.deleteOne({_id: aid}, function(error, author) {
                if (error) {
                    console.log("There was an issue: ", error);
                    res.json(error);
                } else {
                    let response = {
                        message: "Success",
                        author: author
                    };
                    res.json(response);
                }
            });
        });
    },

    addBook: function(aid, book, callback) {
        Author.updateOne({_id: aid}, {$push: {books: book}}, function(error, author) {
            if (error) {
                console.log("There was an issue: ", error);
            } else {
                callback(author);
            }
        });
    },

    removeBook: function(aid, book, callback) {
        console.log("Coming in ");
        Author.updateOne({_id: aid}, {$pull: {books: book}}, function(error) {
            if (error) {
                console.log("There was an issue: ", error);
            } else {
                callback(author);
            }
        });
    }
}