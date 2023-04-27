import express from 'express';
import chalk from 'chalk';
import { people } from './data.js';
import {appendFile} from 'fs';

const app = express();
app.use(express.static('./public'));
//Parse Form Data
app.use(express.urlencoded({extended: false}));
// Parse JSON Data
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/api/people', (req, res) => {
    res.status(200).send({response: true, data: people});
});

app.post('/api/people', (req, res) => {
    const {name} = req.body;

    if(!name) {
        res.status(400).json({response: false, msg: 'please provide name value'})
    } else {
        res.status(201).json({response: true, person: name});
        appendFile('./people.txt', name+'\n', () => {
            console.log('Name added : ' + name);
        })
    }
});

app.post('/login', (req, res) => {
    const { name } = req.body;

    if(name) {
        res.status(200).send(`Welcome, ${name}`);
    } else {
        res.status(401).send('Please provide credentials.');
    }
});

app.listen(PORT, () => {
    console.log(`Server Listening at Port ${chalk.yellow(PORT)}...`);
});