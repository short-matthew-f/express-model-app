var express         = require('express'),
    server          = express(),
    ejs             = require('ejs'),
    expressLayouts  = require('express-ejs-layouts'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    morgan          = require('morgan'),
    mongoose        = require('mongoose'),
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
/* server.use('/cats', catController) tells us to use *
 * the router for any route that starts wit `/cats`   */

// write server specific controllers
server.use('/', function (req, res) {
  res.render('welcome');
});

// start up the database + application
mongoose.connect(MONGOURI + "/" + DBNAME);
server.listen(PORT, function () {
  console.log("I'm up on port", PORT);
});
