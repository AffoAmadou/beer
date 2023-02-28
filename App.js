//! Description: This is the main file for the application. It is the entry point for the application.
require('dotenv').config();
// Importing module
const express = require('express');
const path = require('path');
const axios = require('axios');
const { response } = require('express');
const http = require('http');

const timeago = require('timeago.js');


// Setting up the express app, the port and the server
const app = express();
const port = process.env.PORT || 3010;

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Api call to get all beers
const getBeers = async () => {
    try {
        const response = await axios.get('https://api.punkapi.com/v2/beers');

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
// Api call to get a random beer
const getRandomBeer = async () => {
    try {
        const response = await axios.get('https://api.punkapi.com/v2/beers/random');

        return response.data;
    } catch (error) {
        console.error(error);
    }
};


// Setting up the static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.resolve(__dirname, 'images')));
app.use('/node', express.static(path.resolve(__dirname, 'node_modules')));
app.use('canvas', express.static(path.resolve(__dirname, 'app/components/Canvas')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = app.get('views');



// Setting up the routes, home, beers, random-beer, beers/:id, contact
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
    const beer = await getRandomBeer();
    console.log(beer);
    res.render('pages/details', {
        beer: beer[0],
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

app.get('/contact', (req, res) => {
    res.render('pages/contact', {

    });
});

// Setting up the socket.io, listening to the chat message event
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', { msg: msg, ans: "Quelqun va vous repondre" });
    });
});


server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});