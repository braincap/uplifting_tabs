/*global chrome*/
var imageToURI = require('image-to-data-uri');
var React = require('react');
var Quote = require('./Quote');
import './App.css';

var PicHolder = React.createClass({
  getInitialState: function () {
    return {
      image_uri: ''
    }
  },
  componentWillMount: function () {
    chrome.storage.local.get('image_uri', function (res) {
      if (chrome.runtime.lastError || res['image_uri'] === undefined) {
        this.setState({ image_uri: 'https://source.unsplash.com/random/' + screen.width + 'x' + screen.height });
      } else {
        this.setState({ image_uri: res['image_uri'] });
      }
    }.bind(this));
  },
  componentDidMount: function () {
    imageToURI('https://source.unsplash.com/random/' + screen.width + 'x' + screen.height, function (err, uri) {
      if (!err) {
        chrome.storage.local.set({ 'image_uri': uri });
      }
    });
  },
  render: function () {
    return (
      <div className="pic-holder" style={{ backgroundImage: 'url(' + this.state.image_uri + ')' }}></div>
    )
  }
});

var App = React.createClass({
  render: function () {
    return (
      <div className="container">
        <Quote />
        <PicHolder />
      </div>
    );
  }
});

export default App;