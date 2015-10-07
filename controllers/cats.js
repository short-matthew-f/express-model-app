/* << controllers/cats.js >>
  CATS CONTROLLER: HERE THERE BE ROUTES

  When we include the cat router in server.js, it will be via the command
      server.use('/cats', catRouter);
  Every route below will be prefaced with '/cats', so if we define
      router.get('/:id', function (res, req) {});
  it will really be run when we hit '/cats/:id'
*/

var express = require('express'),
    router  = express.Router(),
    Cat     = require('./models/cat.js');

router.get('/', function (req, res) {
  Cat.find({}, function (err, allCats) {
    res.render('cats/index', {
      cats: allCats
    });
  });
});

router.get('/new', function (req, res) {
  // CAT new FORM page
  res.render('cats/new');
});

router.post('/', function (req, res) {
  // CAT create action + REDIRECT
  console.log(req.body);

  Cat.new(req.body.cat, function (err, newCat) {
    if (err) {
      res.redirect(302, '/cats/new');
    } else {
      res.redirect(302, '/cats');
    }
  });
});

router.get('/:id', function (req, res) {
  // CAT show page
});

router.get('/:id/edit', function (req, res) {
  // CAT edit FORM page
});

router.patch('/:id', function (req, res) {
  // CAT update action + REDIRECT
});

router.delete('/:id', function (req, res) {
  // CAT delete action + REDIRECT
});

module.exports = router;
