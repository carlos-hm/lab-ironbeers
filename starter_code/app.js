
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(`${__dirname}/views/partials`);


app.get('/', (req, res, next) => {
  res.render('index');
});

app.get('/beers', async (req, res) => {
  const beers = await punkAPI.getBeers({'abv_gt': 8});
  
  res.render('beers', {beers});
});

app.get('/random-beers', async (req, res) => {
  const randomBeer = await punkAPI.getRandom();
  console.log(randomBeer)
  res.render('random-beers', ...randomBeer);
});



app.listen(3000, () => console.log("http://localhost:3000"));
