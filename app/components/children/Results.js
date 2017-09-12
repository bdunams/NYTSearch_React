// Include React
const React = require("react");

// Creating the Results component
const Results = React.createClass({

  // Here we describe this component's render method
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search Results</h3>
        </div>
        <div className="panel-body">
          <ul className="list-group">{this.props.articles}</ul>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Results;
