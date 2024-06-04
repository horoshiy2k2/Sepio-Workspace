
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'my-app' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'app.log' })
    ],
});

// Кастомні лог методи для різних рівнів
logger.critical = function(message) {
    this.log({
        level: 'critical',
        message: message,
    });
};

logger.error = function(message) {
    this.log({
        level: 'error',
        message: message,
    });
};

logger.warn = function(message) {
    this.log({
        level: 'warn',
        message: message,
    });
};

logger.info = function(message) {
    this.log({
        level: 'info',
        message: message,
    });
};

logger.httpError = function(message) {
    this.log({
        level: 'httpError',
        message: message,
    });
};

module.exports = logger;

