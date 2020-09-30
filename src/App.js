import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import SignatureItem from './pages/SignatureItem/SignatureItem';
import EliteSummon from './pages/EliteSummon/EliteSummon';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <nav style={{display: "flex", justifyContent: "space-between", padding: 16}}>
        <Link to="/">Home</Link>
        <Link to="/signature-item">SI Emblem</Link>
        <Link to="/elite-summon">Elite summon</Link>
      </nav>
      <Switch>
        <Route path="/signature-item">
          <SignatureItem />
        </Route>
        <Route path="/elite-summon">
          <EliteSummon />
        </Route>  
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
