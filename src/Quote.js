/*global chrome*/
var request = require("request");
var React = require('react');
import ReactTooltip from 'react-tooltip';

var Quote = React.createClass({
  getDefaultProps: function () {
    return {
      url: 'https://uplifting-tabs-aa5c4.firebaseio.com/quotes/' + (Math.floor(Math.random() * 8951) + 1) + '.json'
    }
  },
  getInitialState: function () {
    return {
      quote: "",
      author: "",
      visibility: 'hidden'
    }
  },
  componentWillMount: function () {
    chrome.storage.local.get('text', function (res) {
      if (chrome.runtime.lastError || !res['text'] || res['text'] === 'null') {
        request({
          url: this.props.url,
          json: true,
        }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            this.setState({
              quote: body['quote'],
              author: body['author'],
              visibility: 'visible'
            });
          }
        }.bind(this));
      } else {
        res = JSON.parse(res['text']);
        this.setState({
          quote: res['quote'],
          author: res['author'],
          visibility: 'visible'
        });
      }
    }.bind(this));
  },
  componentDidMount: function () {
    request({
      url: this.props.url,
      json: true,
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        chrome.storage.local.set({ 'text': JSON.stringify(body) });
      }
    });
  },
  render: function () {
    return (
      <div>
        <div data-tip data-for='toolquote' className='quote-holder' style={{ visibility: this.state.visibility }}>
          <h1 className='quote'>{this.state.quote}</h1>
        </div>
        <ReactTooltip id='toolquote' place="top" type="dark" effect="solid">
          <span>{this.state.author}</span>
        </ReactTooltip>
      </div>
    )
  }
});

module.exports = Quote;