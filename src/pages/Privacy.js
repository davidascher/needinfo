/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

var React = require('react');
var PageActions = require('../actions/PageActions');
var DefaultLayout = require('../layouts/DefaultLayout');
var Link = require('../components/Link');

var PrivacyPage = React.createClass({

  statics: {
    layout: DefaultLayout,
    breadcrumb: (
      <ol className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li className="active">Privacy</li>
      </ol>
    )
  },

  componentWillMount() {
    PageActions.set({title: 'Privacy Policy'});
  },

  render() {
    return (
      <div className="container">
        <p>
          This site just displays public data from github issues.
        </p>
      </div>
    );
  }

});

module.exports = PrivacyPage;
