/// make a router to minions

const express = require('express');
const minionsRouter = express.Router();

module.exports = minionsRouter;


// import our database functions
const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

// set up minionId parameter middleware, it uses our database function to retrieve the minion associated with a given id
minionsRouter.param('minionId', (req, res, next, id) => {
    const minionFound = getFromDatabaseById('minion',id);
    if (minionFound) {
        req.minion = minion;
        next()}
    else {
        res.status(404).send()
    }});

// GET request for all minions using our getAllFromDataBase function
minionsRouter.get('/', (req,res,next) =>
    res.send(getAllFromDatabase('minions'))
)

// Post request to create new minion using addToDatabase function which returns the newly created instance if successful and an error message if not
minionsRouter.post('/', (req,res,next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion)
})

// get request for single minion, made easier with  our param middleware
minionsRouter.get('/:minionId', (res,req,next) => {
    res.send(req.minion)
})

// PUT request to update single minion, using updateInstanceInDatabase function, again will return instance or throw error
minionsRouter.put('/:minionId', (req,res,next) => {
    const updatedMinion = updateInstanceInDatabase('minion', req.body);
    res.send(updatedMinion)
})

// Delete request
minionsRouter.delete('/:minionId', (req, res, next) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleted) {
    res.status(204);
  } else {
    res.status(500);
  }
  res.send();
});