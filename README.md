# A model for app development

Here we're going to focus on a few things:  

1. Good folder structure
2. Reusable code
3. A suite of useful packages

## Folder Structure

### Top level files:

1. `server.js` - our main server application`
2. `package.json` - includes saved node modules for portability of code
3. `.gitignore` - includes `node_modules` so that we don't send that folder to github when we sync up

### Top level folders:

1. `public` - where we keep static files for our served pages.  
  a. `images` or `media` - for static pictures, audio, video, etc
  b. `scripts` - for static client-side javascript files
  c. `stylesheets` - for static stylesheets
  d. `fonts` - if you're storing fonts locally
2. `controllers` - this is where you put a `modelNamePlural.js` file which is responsible for all routes for that modelName.  They will be included in `server.js` and namespaced accordingly.
3. `views` - this stores all of your templated views
  a. this is where you put a subfolder called `modelNamePlural`, and include your `templateEngine` (e.g. `ejs`) files for that model.  For example, you might have `views/users` with `new.ejs`, `index.ejs`, `show.ejs`, and `edit.ejs` inside of them.
  b. you also will want to include inside `/views` top level sitewide files, things like your `layout.ejs`, whatever you might use for your root, and files like `footer` and `header`.
4. `models` - here is where your mongoose code lives, in `modelNameSingular.js`
5. `node_modules` - this is the folder for all saved packages

## Reusable code

Ideally this is all about things like:

1. Use a frakkin **layout**.  If you use the package `express-ejs-layouts`, then you can have a `layout.ejs` in your `views` folder, and render will always use that.  Then, it will add whatever you pass into the render function to fill in the `<%- body %>` tag.

2. Rather than `console.log` the everything sometimes it's useful to make that the default.  Use a logger like `morgan` to log every incoming request.  You'll be happy that you did.

3. Keep as much logic out of your views as possible, and use view partials when necessary.  Suppose you have this in your view:  

  ```javascript
  <% if (myModel.age > 21 && myModel.isNotMormon) { %>
    <div class="drinks-are-on-me">
  <% } else { %>
    <div class="no-thanks-brah">
  <% } %>
  ```

  It would be better to either give `myModel` a `drinksClass` method which would then be used like this:  

  ```javascript
  <div class="<%= myModel.drinksClass() %>">
  ```

  Or to create a method in your controller which gets passed into the view:

  Inside the `myModels.js` controller file:
  ```javascript
  router.get('/:id', function (req, res) {
    // code and then...
    res.render("myModel/show", {
      myModel: someModelFromCodeAbove,
      drinksClass: function (m) { // this will be available in .ejs
        if (m.age > 21 && m.isNotMormon) {
          return "drinks-are-on-me";
        } else {
          return "no-thanks-brah";
        };
      }
    });
  })
  ```

  And then in `myModel/show.ejs`:
  ```javascript
  <div class="<%= drinksClass(myModel) %>">
  ```

  Either is fine.

## A suite of useful packages

You should be using as many packages as it takes to make your life better.  The sample code has many, but we'll also be using:

1. [express-session](https://github.com/expressjs/session) which allows us to link an end user's browser to the connection they are making locally, which then gives us persistance for a user.

2. [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/) which allows us to encrypt data, and check that new data is the same as our encrypted data.

3. [passport](http://passportjs.org/) and [passport-local](https://github.com/jaredhanson/passport-local) which allows us to authenticate users easily.
