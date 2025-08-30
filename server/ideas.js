/// make a router to ideas

const express = require('express');
const ideasRouter = express.Router();

module.exports = ideasRouter;


// import our database functions
const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

// custom check for million dollar idea middlware function

const checkMillionDollarIdea = (req, res, next) => {
  const { numWeeks, weeklyRevenue } = req.body;
  const totalMoney = Number(numWeeks) * Number(weeklyRevenue);
  if (!numWeeks || !weeklyRevenue || isNaN(totalMoney) || totalMoney < 1000000) {
    res.status(400).send();
  } else {
    next();
  }
}


// set up ideaId parameter middleware, it uses our database function to retrieve the idea associated with a given id
ideasRouter.param('ideaId', (req, res, next, id) => {
    const ideaFound = getFromDatabaseById('idea',id);
    if (ideaFound) {
        req.idea = idea;
        next()}
    else {
        res.status(404).send()
    }});

// GET request for all ideas using our getAllFromDataBase function
ideasRouter.get('/', (req,res,next) =>
    res.send(getAllFromDatabase('ideas'))
)

// Post request to create new idea using addToDatabase function which returns the newly created instance if successful and an error message if not
ideasRouter.post('/', (req,res,next) => {
    const newidea = addToDatabase('ideas', req.body);
    res.status(201).send(newidea)
})

// get request for single idea, made easier with  our param middleware
ideasRouter.get('/:ideaId', (res,req,next) => {
    res.send(req.idea)
})

// PUT request to update single idea, using updateInstanceInDatabase function, again will return instance or throw error
ideasRouter.put('/:ideaId', (req,res,next) => {
    const updatedidea = updateInstanceInDatabase('idea', req.body);
    res.send(updatedidea)
})

// Delete request
ideasRouter.delete('/:ideaId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});