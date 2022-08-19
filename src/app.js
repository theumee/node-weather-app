const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express();

// Define paths for Express Config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPth = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPth);

// Setup static directory to server
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Umer Farooq",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Umer Farooq",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helperText: "This is a help message.",
    name: "Umer Farooq",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address
  if (!address) {
    return res.send({
      error: "Must provide an address!",
    });
  }

  geocode(address, (error,{latitude,longitude,location} = {}) => {
    if(error){
      return res.send({error})
    }
    forecast( latitude,longitude, (error, forecastData) => {
      if(error){
        return res.send({error})
      }
      res.send({
        location,
        forecast: forecastData,
        address
      })
    })
  })
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Must provide a search term!",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "No such article found!",
    name: "Umer Farooq",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "No such page found!",
    name: "Umer Farooq",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
