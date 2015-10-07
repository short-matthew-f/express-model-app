/* need to include mongoose to use it */
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

/* define the schema */
var catSchema = new Schema({
  name:  String,
  age:   Number,
  color: String
});

/* optional prototype methods */
catSchema.methods.meow = function () {
  return this.name + " is meowing...";
};

catSchema.methods.friends = function (callback) {
  return this.model.find({
    color: this.color
  }, callback);
};

/* finally make the cat model */
var Cat = mongoose.model('Cat', catSchema);

/* remember to export the cat model, rather than an object */
module.exports = Cat;
