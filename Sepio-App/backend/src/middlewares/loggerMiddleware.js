const logger = require('./logger');

const loggerMiddleware = (req, res, next) => {
    const { method, url } = req;
    const logMessage = `${method} ${url}`;
    logger.info(logMessage);
    next();
};

module.exports = loggerMiddleware;
