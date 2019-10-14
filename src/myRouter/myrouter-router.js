const express = require('./node_modules/express');
const uuid = require('./node_modules/uuid/v4');
const logger = require('../logger');

// DATA
const { cards, lists } = require('../store');

// myrouter aka card (ex: this folder name = "card", this filename = "card-router.js")
// myRouter aka cardRouter
const myRouter = express.Router();
const bodyParser = express.json();

myRouter
	.route('/route')
	.get((req, res) => {
		/* code not shown */
	})
	.post((req, res) => {
		/* code not shown */
	});

myRouter
	.route('/route/:id')
	.get((req, res) => {
		/* code not shown */
	})
	.delete((req, res) => {
		/* code not shown */
	});

module.exports = myRouter;
