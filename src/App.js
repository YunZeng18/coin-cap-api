import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CryptoList from "./component/CryptoList";
import Crypto from "./component/Crypto";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={CryptoList} />
        <Route path="/:id" component={Crypto} />
      </Switch>
    </Router>
  )
}