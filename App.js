//! Description: This is the main file for the application. It is the entry point for the application.

// Importing module
const express = require('express');
const path = require('path');
const axios = require('axios');
const { response } = require('express');


// Setting up the express app
const app = express();
const port = 3010;

//Write the code below in a async function and call it in the app.get function
//This is because the axios.get is an async function and it will take some time to get the data from the api
//So you need to wait for the data to be fetched before you can use it
//So you need to use the async await syntax
//You can read more about it here: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await

// This is the code you need to write
const getBeers = async () => {
    try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

//This is how you call the function







app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.resolve(__dirname, 'images')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = app.get('views');



app.get('/', async (req, res) => {
    const beer = await getBeers();

    res.render('pages/home', {
        title: 'Home',

    });
});

app.get('/beers', async (req, res) => {
    const beer = await getBeers();

    res.render('pages/beers', {
        beers: beer,
    });
});

app.get('/random-beer', async (req, res) => {
    const beer = await getBeers();
    let randomBeer = beer[Math.floor(Math.random() * beer.length)];
    res.render('pages/details', {
        beer: randomBeer,
    });
});

app.get('/beers/:id', async (req, res) => {
    const beer = await getBeers();
    let beerId = req.params.id;
    let beerDetails = beer[beerId - 1];
    console.log(beerDetails);
    res.render('pages/details', {
        beer: beerDetails,
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});