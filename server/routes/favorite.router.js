const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  console.log('in /favorite GET');
  const queryText = 'SELECT * FROM "favorites";';
  pool.query(queryText).then(result => {
    res.send(result.rows); // array of favorited GIFS
  }).catch(error => {
    console.log('There\'s an error in /favorite GET');
    res.sendStatus(500);
  })
});

// add a new favorite
router.post('/', (req, res) => {
  console.log('category_id is:', req.body.category_id);
  console.log('giphy_id is:', req.body.giphy_id);
  const queryText = `INSERT INTO "favorites" ("giphy_id", "category_id", "giphy_url")
                    VALUES ($1, $2, $3);`;
  pool.query(queryText, [req.body.giphy_id, req.body.category_id, req.body.giphy_url]).then(result => {
    console.log('/favorite POST success');
    res.sendStatus(201); // created
  }).catch(error => {
    console.log('Error in /favorite POST:', error);
    res.sendStatus(500);
  })
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
