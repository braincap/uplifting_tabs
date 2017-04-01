/*global chrome*/
var request = require("request");
var React = require('react');

var Quote = React.createClass({
  getDefaultProps: function () {
    return {
      url: 'https://apimk.com/motivationalquotes?get_quote=yes'
    }
  },
  getInitialState: function () {
    return {
      text: "",
      visibility: 'hidden'
    }
  },
  componentWillMount: function () {

    chrome.storage.local.get('text', function (res) {
      if (chrome.runtime.lastError || res['text'] === undefined) {
        request({
          url: this.props.url,
          json: true,
        }, function (error, response, body) {
          if (!error && response.statusCode === 200) {
            this.setState({
              text: body[0]['quote'],
              visibility: 'visible'
            });
          }
        }.bind(this));
      } else {
        this.setState({
          text: res['text'],
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
        chrome.storage.local.set({ 'text': body[0]['quote'] });
      }
    });
  },
  render: function () {
    return (
      <div className='quote-holder' style={{ visibility: this.state.visibility }}>
        <h1 className='quote'>{this.state.text}</h1>
      </div>
    )
  }
});

module.exports = Quote;