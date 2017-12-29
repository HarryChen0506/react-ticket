import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import axios from 'axios';
class App extends Component {
  constructor(...args){
    super(...args)
  }
  http(){
    axios({
        method: 'get',
        url: '/api/showapi/pub/site/1001/active_show?offset=0&length=10&type=2&src=m_web&sorting=weight&seq=desc&client=piaodashi_weixin&time=1514531694129&locationCityOID=3101&siteCityOID=1001'
    }).then(function(response){
       console.log(response)
    }).catch(function(err){
        console.log(err)
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.http.bind()}>接口</button>
      </div>
    );
  }
}

export default App;
