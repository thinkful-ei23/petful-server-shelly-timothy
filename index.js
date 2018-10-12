'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const cat = [
	{
		imageURL:
			'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
		imageDescription:
			'Orange bengal cat with black stripes lounging on concrete.',
		name: 'Fluffy',
		sex: 'Female',
		age: 2,
		breed: 'Bengal',
		story: 'Thrown on the street'
	},
	{
		imageURL:
			'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
		imageDescription:
			'Orange bengal cat with black stripes lounging on concrete.',
		name: 'Poofy',
		sex: 'Male',
		age: 2,
		breed: 'Tabby',
		story: 'Thrown'
	},
	{
		imageURL:
			'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
		imageDescription:
			'Orange bengal cat with black stripes lounging on concrete.',
		name: 'Puffy',
		sex: 'Female',
		age: 2,
		breed: 'Bengal',
		story: `Thinks it's a squirrel`
	}
];

const dog = [
	{
		imageURL:
			'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
		imageDescription:
			'A smiling golden-brown golden retreiver listening to music.',
		name: 'Zeus',
		sex: 'Male',
		age: 3,
		breed: 'Golden Retriever'
	},
	{
		imageURL: 'www',
		imageDescription:
			'A smiling golden-brown golden retreiver listening to music.',
		name: 'Dionysus',
		sex: 'Male',
		age: 2,
		breed: 'Mutt',
		story: 'Once upon a time'
	},
	{
		imageURL:
			'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
		imageDescription:
			'A smiling golden-brown golden retreiver listening to music.',
		name: 'Apollo',
		sex: 'Male',
		age: 1,
		breed: 'Golden Puppy',
		story: 'Somewhere over the rainbow'
	}
];

const app = express();

app.use(
	morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
		skip: (req, res) => process.env.NODE_ENV === 'test'
	})
);

app.use(
	cors({
		origin: CLIENT_ORIGIN
	})
);

app.get('/api/cat', (req, res, next) => {
	res.send(cat[0]);
});

app.get('/api/dog', (req, res, next) => {
	res.send(dog[0]);
});

app.delete('/api/cat/:name', (req, res, next) => {
	const { name } = req.params;
	if (name.toLowerCase() === cat[0].name.toLowerCase()) {
		// console.info(cat[0].name);
		cat.splice(0, 1);
		res.status(200).send({ message: `Congratulations on your adoption!` });
	} else {
		res.status(400).send({ message: `Sorry, you can't adopt this one...yet!` });
	}
});

app.delete('/api/dog/:name', (req, res, next) => {
	const { name } = req.params;
	if (name.toLowerCase() === dog[0].name.toLowerCase()) {
		// console.info(cat[0].name);
		dog.splice(0, 1);
		res.status(200).send({ message: `Congratulations on your adoption!` });
	} else {
		res.status(400).send({ message: `Sorry, you can't adopt this one...yet!` });
	}
});

function runServer(port = PORT) {
	const server = app
		.listen(port, () => {
			console.info(`App listening on port ${server.address().port}`);
		})
		.on('error', err => {
			console.error('Express failed to start');
			console.error(err);
		});
}

if (require.main === module) {
	dbConnect();
	runServer();
}

module.exports = { app };
