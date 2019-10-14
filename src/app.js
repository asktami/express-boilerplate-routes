require('dotenv').config();
const express = require('express');
const logger = require('./logger');
// const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV } = require('./config');

// ROUTERS
const cardRouter = require('./card/card-router');

const app = express();

// const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
// app.use(morgan(morganOption));

app.use(helmet());
app.use(cors());
app.use(helmet.hidePoweredBy());

// get to / without authorization
app.get('/', (req, res) => {
	res.send('Hello, world!');
});

//  validate that an Authorization header with an API token is present
app.use(function validateBearerToken(req, res, next) {
	const apiToken = process.env.API_TOKEN;
	const authToken = req.get('Authorization');

	if (!authToken || authToken.split(' ')[1] !== apiToken) {
		// If the authorization fails log the error
		logger.error(`Unauthorized request to path: ${req.path}`);
		return res.status(401).json({ error: 'Unauthorized request' });
	}
	// move to the next middleware
	next();
});

// USE ROUTER
app.use(cardRouter);

app.use(function errorHandler(error, req, res, next) {
	let response;
	if (NODE_ENV === 'production') {
		response = { error: { message: 'server error' } };
	} else {
		console.error(error);
		response = { message: error.message, error };
	}
	res.status(500).json(response);
});

module.exports = app;
