const winston = require('winston');
const { NODE_ENV } = require('./config');

// set up Winston logger
// Winston has six levels of severity: silly, debug, verbose, info, warn and error.
// The logs will be stored in a file named info.log in JSON format. In the development environment, it will also log to the console.
const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [new winston.transports.File({ filename: 'info.log' })]
});

if (NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple()
		})
	);
}

module.exports = logger;
