const router = require('express').Router();
const request = require('request');

const omdbApiKey = '640dfac7';

router.get('/:imdbId', (req, res, next) => {
  try {
    request({
      uri: 'http://www.omdbapi.com/',
      qs: {
        apikey: omdbApiKey,
        i: req.params.imdbId
      }
    }).pipe(res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
