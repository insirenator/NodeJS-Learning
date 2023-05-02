const express = require('express');
const connectDB = require('./db/connect');
const studentsRoutes = require('./routes/students');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/v1/students', studentsRoutes);

// app.get('/hello', (req, res) => {
//     res.status(200).json({msg: 'Students API'});
// });

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Connected to Database.');
        app.listen(port, () => console.log(`Server Listening at localhost:${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();
