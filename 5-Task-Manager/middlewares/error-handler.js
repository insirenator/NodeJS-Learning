const { CustomAPIError } = require('../errors/custom-api-error');

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        res.status(err.statusCode).json({msg: err.message});
    }
    else {
        res.status(500).json({ msg: err });
    }
};

module.exports = errorHandlerMiddleware;