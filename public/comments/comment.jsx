var React = require('react');
var marked = require('marked');

module.exports = React.createClass({
  render: function(){
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}}  />
      </div>
    );
  }
});