const express = require('express');
const app = express();
const routeBooks = require('./routes/crud-books');
const errorHandler = require('./middlewares/errorHandler');

app.use(express.json());
app.use('/books', routeBooks);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
    console.log(`Express.js server running at port ${port}`);
});