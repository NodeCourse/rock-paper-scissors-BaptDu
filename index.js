const express = require('express');
const bodyParser = require('body-parser');
const ramdomItem = require('random-item');
const item = require('./item.json');
const app = express();

// Use Pug to render views
app.set('view engine', 'pug');

// Serve assets from the public folder
app.use(express.static('public'));

// Decode form data
app.use(bodyParser.urlencoded({extended: true}));

// Parse JSON body
app.use(bodyParser.json());

// Render the home page
app.get('/', (req, res) => {
    res.render('homepage', {item});
});

// Render the signup page
app.get('/play/:item', (req, res) => {

    const userChoiceItem = item.find((item) => {
            return item.id === req.params.item;
        });

    const computerChoiceItem = ramdomItem(item);

    function result(userChoiceItem, computerChoiceItem) {

        if (userChoiceItem.winOver.includes(computerChoiceItem.id)){
            return userChoiceItem;
        }

        if (computerChoiceItem.winOver.includes(userChoiceItem.id)){
            return computerChoiceItem;
        }

        return null;

    }

    const winner  = result(userChoiceItem, computerChoiceItem);

    res.render('play', {userChoiceItem, computerChoiceItem, winner});

});

app.listen(3000);