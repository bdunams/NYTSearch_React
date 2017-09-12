// Routes
// ======
const express = require('express');
const router = express.Router();

// Requiring our Note and Article models
let Article = require("../models/Article.js");



//GET ROUTES
// ========================================================================
// GET Home page
router.get("/", function(req, res) {

  res.render('index');

});


// This will grab an article by it's ObjectId
router.get("/articles", function(req, res) {

  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.find()
  // now, execute our query
  .exec(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      console.log(doc);
      res.json(doc);
    }
  });


});


// POST ROUTES
//===========================================================================
// POST articles we scraped to the mongoDB
router.post("/save-article/", function(req, res) {

  // Using our Article model, create a new entry
  // This effectively passes the result object to the entry (and the title and link)
  console.log(req.body)
  let entry = new Article(req.body);

  // Now, save that entry to the db
  entry.save(function(err, doc) {
    // Log any errors
    if (err) {
      console.log(err);
      res.redirect('/');
    }
    // Or log the doc
    else {
      res.redirect("/");
    }
  });

});



// DELETE ROUTES
//==========================================================================

// DELETE will remove an article by it's ObjectId
router.post("/articles/delete", function(req, res) {

  Article.remove({_id:req.body.id}, function(err, doc) {
    if (err) {
      console.log(err);
      res.redirect("/");
    }
    else {
      res.redirect("/");
    }
  });


});


module.exports = router;