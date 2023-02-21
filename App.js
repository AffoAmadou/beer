//! Description: This is the main file for the application. It is the entry point for the application.

// Importing module
const express = require('express');
const path = require('path');



// Setting up the express app
const app = express();
const port = 3010;



app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = app.get('views');

app.get('/', async (req, res) => {
    res.render('pages/home', {
        title: 'Home',
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});