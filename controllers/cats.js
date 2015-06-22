/* << controllers/cats.js >>
  CATS CONTROLLER: HERE THERE BE ROUTES

  When we include the cat router in server.js, it will be via the command
      server.use('/cats', catRouter);
  Every route below will be prefaced with '/cats', so if we define
      router.get('/:id', function (res, req) {});
  it will really hit '/cats/:id'
*/

var express = require('express'),
    router  = express.Router();

router.get('/', function (req, res) {
  res.render('cats/index');
});

router.get('/new', function (req, res) {
  // CAT new FORM page
  res.render('cats/new');
});

router.post('/', function (req, res) {
  // CAT create action + REDIRECT
  console.log(req.body);
  res.redirect(301, '/cats/1');
});

router.get('/:id', function (req, res) {
  // CAT show page
  res.render('cats/show', { id: req.params.id });
});

router.get('/:id/edit', function (req, res) {
  // CAT edit FORM page
  res.render('cats/edit', { id: req.params.id });
});

router.patch('/:id', function (req, res) {
  // CAT update action + REDIRECT
  console.log(req.body);
  res.redirect(301, '/cats/' + req.params.id);
});

router.delete('/:id', function (req, res) {
  // CAT delete action + REDIRECT
  res.redirect(301, '/cats')
});

module.exports = router;
