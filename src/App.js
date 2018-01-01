import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import AppRoute from './router/router.js';

class App extends Component { 
  componentDidMount(){
     this.remSize();
     window.onresize = () => {
        this.remSize();
    }
  }
  remSize(){
    //rem布局 html根size：375px下为10px
      var html = document.querySelector('html');
      html.style.fontSize = window.screen.width/37.5 + "px";  
  }
  render() {
    return <AppRoute />
  }
}

export default App;
