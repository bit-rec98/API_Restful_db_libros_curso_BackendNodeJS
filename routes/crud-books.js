const express = require('express');
const route = express.Router();
const db = require('./db-books.json');

// console.log(db);

route.get('/', (req, res, next) => {
    try {
        res.json(db);
    } catch (error) {
        next(error);
    };
});

// GET
route.get('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const book = db.find((b) => b.id === id);
        if(!book){
            const error = new Error('Book not found!');
            error.status = 404;
            throw error;
        } else {
            res.json(book);
        };
    } catch (error) {
        next(error);
    };
});

// POST 
route.post('/', (req, res, next) => {
    try {
        const {name, price, author} = req.body;

        const newBook = {
            id: db.length + 1,
            name,
            price,
            author
        };

        db.push(newBook);
        let statusResponse = res.status(200);
        statusResponse.json(newBook);

    } catch (error) {
        next(error);
    };
});

// PUT
route.put('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const {name, price, author} = req.body;

        const book = db.find((b) => b.id === id);

        if(!book){
            const error = new Error('Book not found!');
            error.status = 404;
            throw error;
        } else {
            book.name = name || book.name;
            book.price = price || book.price;
            book.author = author || book.author;

            res.json(book);
        };
    } catch (error) {
        next(error);
    };
});

route.delete('/:id', (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        const index = db.findIndex((b) => b.id === id);

        if(index === -1){
            const error = new Error('Product not found!');
            error.status = 404;
            throw error;
        } else {
            const deletedBook = db.splice(index, 1);
            res.json(deletedBook[0]);
        };
    } catch (error) {
        next(error);
    };
});

module.exports = route;