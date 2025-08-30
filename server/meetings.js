/// make a router to meetings

const express = require('express');
const meetingsRouter = express.Router();

module.exports = meetingsRouter;


// import our database functions
const { 
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db');

// GET request for all meetings using our getAllFromDataBase function
meetingsRouter.get('/', (req,res,next) =>
    res.send(getAllFromDatabase('meetings'))
)

// Post request to create new meeting using addToDatabase function which returns the newly created instance if successful and an error message if not
meetingsRouter.post('/', (req,res,next) => {
    const newmeeting = addToDatabase('meetings', req.body);
    res.status(201).send(newmeeting)
})

// delete request for all meetings using our deleteAllFromDataBase function
meetingsRouter.delete('/', (req,res,next) =>{
    deleteAllFromDatabase('meetings');
    res.status(204).send()}
)
