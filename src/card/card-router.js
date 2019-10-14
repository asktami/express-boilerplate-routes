const express = require('express');
const uuid = require('uuid/v4');
const logger = require('../logger');

// DATA
const { cards, lists } = require('../store');

const cardRouter = express.Router();
const bodyParser = express.json();

cardRouter
	.route('/card')
	.get((req, res) => {
		res.json(cards);
	})
	.post(bodyParser, (req, res) => {
		//  Get the data from the body
		const { title, content } = req.body;

		// Then validate that both title and content exist
		if (!title) {
			logger.error(`Title is required`);
			return res.status(400).send('Invalid data - Title is required');
		}

		if (!content) {
			logger.error(`Content is required`);
			return res.status(400).send('Invalid data - Content is required');
		}

		// If they do exist, then generate an ID and push a card object into the array

		// get an id
		const id = uuid();
		// create card object
		const card = {
			id,
			title,
			content
		};

		// push card object into cards array (DATA)
		cards.push(card);

		// log the card creation
		logger.info(`Card with id ${id} created`);

		// send a response, with the card object, including a location header
		res
			.status(201)
			.location(`http://localhost:8000/card/${id}`)
			.json(card);
	});

cardRouter
	.route('/card/:id')
	.get((req, res) => {
		const { id } = req.params;
		const card = cards.find(c => c.id == id);

		// make sure we found a card
		if (!card) {
			logger.error(`Card with id ${id} not found.`);
			return res.status(404).send('Card Not Found');
		}

		res.json(card);
	})
	.delete((req, res) => {
		const { id } = req.params;

		const cardIndex = cards.findIndex(c => c.id == id);

		if (cardIndex === -1) {
			logger.error(`Card with id ${id} not found.`);
			return res.status(404).send('Not found');
		}

		//remove card from lists
		//assume cardIds are not duplicated in the cardIds array
		lists.forEach(list => {
			const cardIds = list.cardIds.filter(cid => cid !== id);
			list.cardIds = cardIds;
		});

		cards.splice(cardIndex, 1);

		logger.info(`Card with id ${id} deleted.`);

		res.status(204).end();
	});

module.exports = cardRouter;
