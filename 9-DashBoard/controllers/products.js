const Product = require('../models/Product');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const getAllProducts = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({success: false, msg: 'no token provided'})
    }

    const token = authHeader.split(' ')[1];

    let response = {};

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        response.payload = decoded;
    } catch (error) {
        return res.status(401).json({success: false, msg: 'not authorised to access this route', error});
    }

    try { 
        const data = await Product.find({}).limit(20);
        response.success = true;
        response.products = { nbHits: data.length, data};
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({success: false, msg: error.message});
    }
}

module.exports = {
    getAllProducts,
};