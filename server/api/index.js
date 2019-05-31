'use strict';

const router = require('express').Router();

//routes for server db queries:
router.use('/mydb', require('./mydb'));

//routes for omdb API queries:
router.use('/omdb', require('./omdb'));

//error handing in case an API route isn't matched to one of the above, to create a new Error object,
//give it a 404 status, and send to our middleware to handle the error
router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
