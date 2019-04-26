//install => npm i hbs@4.0.1
//console.log("hey");
const path = require("path"); //core node module
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000; //for dynamic port

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "web developer"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "web developer"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "web developer",
    helpMsg: 'This is help page'
  });
});

//try : http://localhost:3000/weather?address=mumbai
//try: http://localhost:3000/weather?address=! => for error
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address '
    });
  }
  geocode(req.query.address, (error, {
    latitude,
    longitude,
    location
  } = {}) => {
    //setting up empty object as default value to avoid error
    if (error) {
      return res.send({
        error
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });

  // res.send({
  //   forecast: 'It is snowing',
  //   location: 'pune',
  //   address: req.query.address
  // });

});

// app.get('/products', (req, res) => {
//   if (!req.query.search) {
//     return res.send({
//       error: 'You must provide a search trem '
//     });
//   }
//   console.log(req.query.search)
//   res.send({
//     products: []
//   })
// });

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Web-Developer',
    errorMsg: 'Help Page not found'
  });
});

//Any thing except above url => * as wildcard in express and this block should be placed after all the valid url's.
app.get("*", (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Web-Developer',
    errorMsg: 'Page not found'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});