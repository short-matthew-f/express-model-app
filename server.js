var express         = require('express'), // express is our web server package
    server          = express(), // when you execute express, it creates the server
    ejs             = require('ejs'), // ejs is our templating language
    expressLayouts  = require('express-ejs-layouts'), // this lets us use a layout.ejs which then can include partials inside of it
    bodyParser      = require('body-parser'), // this eats submitted form data and creates an object in req.body
    methodOverride  = require('method-override'), // this lets us use put, patch, and delete
    morgan          = require('morgan'), // this is a logger
    mongoose        = require('mongoose'), // this is our interface for MongoDB
    MONGOURI        = process.env.MONGO_URI || "mongodb://localhost:27017",
    DBNAME          = "my-db-name",
    PORT            = process.end.PORT || 3000;

// set views folder and change engine to ejs
server.set('views', './views');
server.set('view engine', 'ejs');

// let static files be served from the /public folder
server.use(express.static('./public'));

// use server logger for requests, but require short descriptions
server.use(morgan('dev'));

// let forms submit into req.body with nice nested properties
server.use(bodyParser.urlencoded({ extended: true }));

// let forms submit to PUT, PATCH, and DELETE with query string ?_method=XXX
server.use(methodOverride("_method"));

// use a layout.ejs file in /views, so as to have one main application wide
// layout, each view then gets passed in to wherever <%- body %> is
server.use(expressLayouts);

// import model based controllers
var catController = require('./controllers/cats.js');
server.use('/cats', catController);
// server.use('/cats', catController) tells us to use
// the router for any route that starts with `/cats`

// write server specific controllers
server.use('/', function (req, res) {
  res.render('welcome');
});

// start up the database + application
mongoose.connect(MONGOURI + "/" + DBNAME);
server.listen(PORT, function () {
  console.log("I'm up on port", PORT);
});
