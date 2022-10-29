const express = require('express');
const pool = require('../modules/pool');
const axios = require('axios');

const router = express.Router();

// return gifs by search term 
router.get('/:search', (req, res) => {
    const searchTerm = req.params.search;
    console.log('in /search/:search. Term to search is:', searchTerm);
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${searchTerm}&limit=5&offset=0&rating=g&lang=en`
    ).then(response => {
        res.send(response.data);
    }).catch(error => {
        console.log('There is an error in /search GET', error);
        res.sendStatus(500);
    })
});


module.exports = router;
