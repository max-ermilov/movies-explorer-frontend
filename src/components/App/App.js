import React from 'react';
// import { Route, Switch, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import './App.css';

function App() {
  return (
    <div className="page">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;
