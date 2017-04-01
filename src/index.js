import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);


var a = document.querySelector('.blur-image');

document.addEventListener("DOMContentLoaded", function() {
  if (!a) return !1;
  var b = a.getAttribute("data-src"),
      c = document.querySelector('.full-image'),
      img = new Image;

  img.src = b;
  img.onload = function () {
    c.classList.add('image-loaded'),
    c.style.backgroundImage = 'url(' + b + ')';
  };
});