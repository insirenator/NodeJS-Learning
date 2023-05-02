const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {

    const products = await Product.find({}).select('name price');
    res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
    const { featured, company, search, sort, fields } = req.query;

    const queryObject = {};

    if(featured) {
        queryObject.featured = featured === 'true'? true : false;
    }

    if (company) {
        queryObject.company = company;
    }

    if (search) {
        queryObject.name = {$regex: search, $options:'i'};
    }

    let result = Product.find(queryObject);

    if (sort) {
        sortList = sort.split(',').join(' ');
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt');
    }

    if (fields) {
        const fieldList = fields.split(',').join(' ');
        result = result.select(fieldList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const products = await result

    res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
    getAllProducts,
    getAllProductsStatic,
};