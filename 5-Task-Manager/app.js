const express = require('express');
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(express.static('./public/'));
app.use(express.json());

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => { 
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log('Serving at Port ' + PORT + '...');
        });
    } catch (err) {
        console.log(err);
    }
}

start();


