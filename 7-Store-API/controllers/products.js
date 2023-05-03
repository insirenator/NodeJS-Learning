const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {

    const products = await Product.find({});
    res.status(200).json({ products, nbHits: products.length });
    console.log(req.query.numFilters);
};

const getAllProducts = async (req, res) => {
    const { featured, company, search, sort, fields, numericFilters } = req.query;

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

    if (numericFilters) {
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }

        const regEx = /\b(<|>|<=|>=|=)\b/g;
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
        const options = ['price', 'rating'];
        filters.split(',').forEach(filter => {
            const [ field, operator, value] = filter.split('-');
            if (options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)};
            }
        }); 
    }

    // console.log(queryObject);

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