import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignatureItem from "./pages/SignatureItem/SignatureItem";
import EliteSummon from "./pages/EliteSummon/EliteSummon";
import Loot from "./pages/Loot/Loot";
import Menu from "./components/Menu";
import HeroList from "./pages/HeroList/HeroList";

function App() {
  return (
    <Router>
      <Menu />
      <div style={{ maxWidth: "480px", margin: "auto" }}>
        <Switch>
          <Route path="/signature-item">
            <SignatureItem />
          </Route>
          <Route path="/elite-summon">
            <EliteSummon />
          </Route>
          <Route path="/loot">
            <Loot />
          </Route>
          <Route path="/hero-list/:id">
            <HeroList />
          </Route>
          <Route path="/hero-list">
            <HeroList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
