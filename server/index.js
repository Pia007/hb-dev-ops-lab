const express = require('express');
const app = express();

// install cors
const cors = require('cors');
const path = require('path');

app.use(express.json());

//config app to use cors
app.use(cors());

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
    accessToken: 'dc17e785e96e4d14bf4792274c18a09e',
    captureUncaught: true,
    captureUnhandledRejections: true
});


// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

const dreams = ['Win A Million Bucks', 'Swim in the Bellagio Fountains', 'VIP Tickets to A Show'];

app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, '../index.html'));

    rollbar.log("Some one has a Dream");
});

app.get('/api/dreams', (req, res) => {
    rollbar.info("Dreams Listed")
    res.status(200).send(dreams);
    
    
})


const port = process.env.PORT || 5050

app.listen(port, () => console.log(`Server listening on ${port}`))