require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('./public/'));

// Routes

app.use('/api/v1/products', productsRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Listening at Port ${port}...`);
        });     
    } catch (error) {
        console.log(error)
    }
};

start();