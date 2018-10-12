const express = require('express');
const dogRouter = express.Router();
const Queue = require('../queue/queueClass');

const dogQueue = new Queue();

dogQueue.enqueue({
  imageURL:
    'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription:
    'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'
});
dogQueue.enqueue({
  imageURL:
    'http://img.freepik.com/free-photo/husky-breed-dog-with-tongue-out_1187-1500.jpg?size=338&ext=jpg',
  name: 'June',
  sex: 'female',
  age: 1,
  breed: 'Husky',
  story: 'Rejected by mother.'
});
dogQueue.enqueue({
  imageURL:
    'http://www.dogbreedslist.info/uploads/allimg/dog-pictures/German-Shepherd-Dog-1.jpg',
  name: 'Tornado',
  sex: 'female',
  age: 5,
  breed: 'German Shepherd',
  story: 'Owner moved to a small apartment.'
});

dogRouter.use(express.json());

dogRouter.get('/dogs', (req, res) => {
  return res.json(dogQueue.peek()); // return a dog
});

dogRouter.delete('/dogs', (req, res) => {
  res.json(dogQueue.dequeue()); // delete the first dog in the array
});

module.exports = dogRouter;
