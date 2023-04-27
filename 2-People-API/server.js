import express from 'express';
import chalk from 'chalk';
import { people } from './data.js';

const app = express();
app.use(express.static('./public'));
app.use(express.urlencoded({extended: false}));
const PORT = process.env.PORT || 5000;

app.get('/api/people', (req, res) => {
    res.status(200).send({response: true, data: people});
});

app.post('/login', (req, res) => {
    const { name, region } = req.body;

    if(name) {
        res.status(200).send(`Welcome, ${name} of ${region}`);
    } else {
        res.status(401).send('Please provide credentials.');
    }
});

app.listen(PORT, () => {
    console.log(`Server Listening at Port ${chalk.yellow(PORT)}...`);
});