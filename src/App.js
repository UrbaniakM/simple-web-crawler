import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ProductsList from './ProductsList';

import Crawl from './Crawl';

class App extends Component {
  render() {
    var crawl = new Crawl();
    crawl.crawlWebpage();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <ProductsList />
      </div>
    );
  }
}

export default App;
