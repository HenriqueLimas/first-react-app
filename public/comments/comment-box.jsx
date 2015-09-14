var React = require('react');
var $ = require('jquery');

var CommentList = require('./comment-list.jsx');
var CommentForm = require('./comment-form.jsx');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      data: []
    };
  },
  loadCommentsFromServer: function(){
    console.log('loading files: ' + new Date());
    $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
            data: data
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({
      data: newComments
    });
    $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: comment,
        cache: false,
        success: function(data) {
          this.setState({
            data: data
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
          <CommentList data={this.state.data}/>
          <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
    );
  }
});