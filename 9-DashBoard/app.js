require('dotenv').config();
// require('express-async-errors');
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const notFoundMiddleware = require('./errors/not-found');

app.use(express.static('./public/'));
app.use(express.json());
const port = process.env.PORT || 8000;

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/products', productsRouter);
app.use(notFoundMiddleware)


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to the database.');
        app.listen(port, () => {
            console.log(`Server in listening at localhost:${port}...`);
        });
    } catch (error) {
        console.log(error)
    }
}

start();