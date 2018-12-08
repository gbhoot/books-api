var authors = require('../controllers/authors.js');
var books = require('../controllers/books.js');

module.exports = function(app) {
    app.get('/authors', function(req, res) {
        authors.getAll(req, res);
    });

    app.get('/authors/:id', function(req, res) {
        authors.getOne(req, res);
    });

    app.post('/authors', function(req, res) {
        console.log(req.body);
        authors.create(req, res);
    });

    app.put('/authors/:id', function(req, res) {
        authors.update(req, res);
    });

    app.delete('/authors/:id', function(req, res) {
        authors.destroy(req, res);
    });

    app.post('/books/:id', function(req, res) {
        books.create(req, res);
    });

    app.delete('/books/:id', function(req, res) {
        books.destroy(req, res);
    });

    app.get('/books', function(req, res) {
        books.get(req, res);
    })
}