var Book = require('../models/book.js')
var authors = require('../controllers/authors.js');

module.exports = {
    create: function(req, res) {
        let aid = req.params.id;
        let inc_book = req.body;
        inc_book.author = aid;
        let book = new Book(inc_book);
        book.save(function(error, new_book) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                authors.getAll(req, res);
                // authors.addBook(aid, new_book, function(author) {
                //     let response = {
                //         message: "Success",
                //         book: new_book,
                //         author: author
                //     };
                //     res.json(response);
                // });
            }
        });
    },

    destroy: function(req, res) {
        let bid = req.params.id;
        Book.find({_id: bid}, function(error, book) {
            if (book) {
                let aid = book['author'];
                // authors.removeBook(aid, book, function() {
                    Book.deleteOne({_id: bid}, function(error, book) {
                        if (error) {
                            console.log("There was an issue: ", error);
                            res.json(error);
                        } else {
                            let response = {
                                message: "Success",
                                book: book
                            };
                            res.json(response);
                        }
                    });
                // });
            } else {
                let response = {
                    message: "Failure, book doesn't exist"
                };
                res.json(response);
            }
        });
    },

    delete: function(bid, callback) {
        Book.deleteOne({_id: bid}, function(error, book) {
            if (error) {
                console.log("There was an issue: ", error);
                callback("error");
            } else {
                callback(book);
            }
        });
    },

    get: function(req, res) {
        Book.find({}, function(error, books) {
            if (error) {
                console.log("There was an issue: ", error);
                res.json(error);
            } else {
                let response = {
                    message: "Success",
                    books: books
                };
                res.json(response);
            }
        });
    }
}