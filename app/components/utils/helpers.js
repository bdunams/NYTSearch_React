// Include the axios package for performing HTTP requests (promise based alternative to request)
let axios = require("axios");

// Geocoder API
let API_KEY = "c96d79c3d7be46059b5d4873c11b9b35";

// Helper Functions (in this case the only one is runQuery)
let helpers = {

  runQuery: function(articleQuery) {

    console.log(articleQuery);

    // Figure out the geolocation
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + articleQuery + "&api_key=" + API_KEY;

    return axios.get(queryURL).then(function(articles) {
      
      let topFiveArticles = articles.data.response.docs.slice(0,5)

      console.log(topFiveArticles);
      return topFiveArticles;
    });

  },
  
  // Get saved articles from DB
  getSavedArticles: function(){
    
    return axios.get('/articles');
  }

};

// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
