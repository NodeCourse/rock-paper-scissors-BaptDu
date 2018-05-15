const express = require('express');
const bodyParser = require('body-parser');
const luck = require('random-item');
const items = require('./items.json');
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
    res.render('homepage', {items});


});

// Render the signup page
app.get('/play/:items', (req, res) => {
    res.render('play');

    function ComputerLuck() {

        let choixOrdi = luck([items.name]);

        if (choixOrdi === "papier") {
            return res.render({messageUser: 'l\'ordinateur à jouer papier'})
        }
        else if(choixOrdi === "ciseaux") {
            return res.render({messageUser: 'l\'ordinateur à jouer ciseaux'})

        }
        else if(choixOrdi === "pierre") {
            return res.render({messageUser: 'l\'ordinateur à jouer pierre'})
        }
    }


    function UserLuck(User) {

        if(User === "pierre") {
            return res.render({messageUser: 'l\'ordinateur à jouer papier'})
        }
        else if(User === "feuille") {
            return res.render({messageUser: 'l\'ordinateur à jouer feuille'})
        }
        else if(User === "ciseaux") {
            return res.render({messageUser: 'l\'ordinateur à jouer ciseaux'})
        }
    }


});

app.listen(3000);