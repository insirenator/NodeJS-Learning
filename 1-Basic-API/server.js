import express from 'express';
import chalk from 'chalk';
import { products } from './data.js';
import logger from './logger.js';

const app = express();
app.use(logger);
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('HOME PAGE!');
});

app.get('/api/products',  (req, res) => {
    let queriedProducts = products.map((product) => {
        const {id, name} = product;
        return {id, name};
    });
    const { search, limit } = req.query;

    if (search) {
        queriedProducts = queriedProducts.filter((product) => {
            return product.name.startsWith(search)
        });
    }

    if (limit) {
        queriedProducts = queriedProducts.slice(0, Number(limit));
    }

    if(queriedProducts.length < 1) {
        res.json({response: false, error: "no products matched!"});
    } else {
        res.json({response: true, data: queriedProducts});

    }

});

app.get('/api/products/:prodID', (req, res) => {
    const { prodID } = req.params;
    const singleProduct = products.find((product) => product.id === Number(prodID));
    
    if(singleProduct) {
        res.json({response: true, data: singleProduct});
    } else {
        res.json({response: false, error: "product not found!"});
    }
});

app.listen(PORT, () => {
    console.log(`Server Listening at Port ${chalk.yellow(PORT)}...`);
});