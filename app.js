// Imports
const express = require('express');
const app = express();
const axios = require('axios');
require('dotenv').config();
const port = 3000;

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js/dropdown-currencies.js'));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
      res.render('index')
});

app.get("/rate/:currency", async (req, res) => {
      const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${req.params.currency}`)
      res.send(response.data);
});

// Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));
