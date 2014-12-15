/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var ReactFireMixin = require('reactfire');
var PageActions = require('../actions/PageActions');
var DefaultLayout = require('../layouts/DefaultLayout');

var Showdown = require('showdown');
var converter = new Showdown.converter();

var Firebase = require('firebase');
var firebaseApp = "https://debt.firebaseio.com/asks";
var firebaseApp = new Firebase(firebaseApp);

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment, index) {
      return <Comment key={index} author={comment.author}>{comment.text}</Comment>;
    });
    return <div className="commentList">{commentNodes}</div>;
  }
});

var CommentBox = React.createClass({
  mixins: [ReactFireMixin],

  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comments.push(comment);
    this.setState({data: comments});

    // Here we push the update out to Firebase
    this.firebaseRefs["data"].push(comment);
  },
  componentWillMount: function() {
    // Here we bind the component to Firebase and it handles all data updates,
    // no need to poll as in the React example.
    // XXX uncomment this and the reactification fails. Why?
    this.bindAsArray(firebaseApp, "data");
  },
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
      </div>
    );
  }
});

var HomePage = React.createClass({

  statics: {
    layout: DefaultLayout
  },

  componentWillMount() {
    PageActions.set({title: 'NeedInfo'});
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h3>People view</h3>
            <dl>
              <CommentBox/>
            </dl>
          </div>
          <div className="col-sm-6">
            <h3>Repo view</h3>
            <dl>
              <dt><a href="http://gulpjs.com">Gulp</a></dt>
              <dd>JavaScript streaming build system and task automation</dd>
              <dt><a href="http://webpack.github.io/">Webpack</a></dt>
              <dd>Compiles front-end source code into modules / bundles</dd>
              <dt><a href="http://www.browsersync.io/">BrowserSync</a></dt>
              <dd>A lightweight HTTP server for development</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = HomePage;
