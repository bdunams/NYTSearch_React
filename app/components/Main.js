// Include React
const React = require("react");

// Here we include all of the sub-components
const Form = require("./children/Form");
const Results = require("./children/Results");
const SavedArticles = require("./children/SavedArticles");

// Helper Function
const helpers = require("./utils/helpers.js");

// This is the main component.
const Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  getInitialState: function() {
    return { searchTerm: "", articleSearchResults: "", savedArticles: "" };
  },
  
  componentDidMount: function(){
    
    helpers.getSavedArticles().then( response => {
      console.log(response.data)
      let dbArticles = response.data.map((articles)=> {
        return(
          <li 
            className="list-group-item" 
            key={articles._id}>
            <p><b>Title:</b> {articles.title}</p>
            <p><b>Summary:</b> {articles.summary}</p>
            <form method="post" action="/articles/delete">
              <input type="hidden" name="id" value={articles._id}></input>
              <button type="submit" className="btn btn-danger">Delete</button>
            </form>
          </li>
        )
      })
      
      this.setState({savedArticles: dbArticles})
    })
  },

  // If the component updates we'll run this code
  componentDidUpdate: function(prevProps, prevState) {

    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("UPDATED");

      helpers.runQuery(this.state.searchTerm).then(function(data) {
        if (data !== this.state.results) {
          console.log("HERE");
          console.log(data);
          
          let articles = data.map((articles) => {
            return(
              <li 
                className="list-group-item" 
                key={articles._id}>
                <p><b>Title:</b> {articles.headline.print_headline}</p>
                <p><b>Summary:</b> {articles.snippet}</p>
                <form method="post" action="/save-article">
                  <input type="hidden" name="title" value={articles.headline.print_headline}></input>
                  <input type="hidden" name="summary" value={articles.snippet}></input>
                  <button type="submit" className="btn btn-success">Save Article</button>
                </form>
              </li>
            )
          })

          this.setState({ articleSearchResults: articles });
        }

        // This code is necessary to bind the keyword "this" when we say this.setState
        // to actually mean the component itself and not the runQuery function.
      }.bind(this));
    }
  },
  // We use this function to allow children to update the parent with searchTerms.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h2 className="text-center">NYT Article Scrubber</h2>
            <p className="text-center">
              <em>Search an article (ex: "Cleveland").</em>
            </p>
          </div>

          <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results articles={this.state.articleSearchResults} />

          </div>
          
          <div className="col-md-6">

            <SavedArticles articles={this.state.savedArticles} />

          </div>

        </div>

      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
