import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Menu from "./functionnal/Menu";
import EliteSummon from "./pages/EliteSummon/EliteSummon";
import FastReward from "./pages/FastReward/FastReward";
import HeroList from "./pages/HeroList/HeroList";
import Home from "./pages/Home/Home";
import Loot from "./pages/Loot/Loot";
import SignatureItem from "./pages/SignatureItem/SignatureItem";

interface IProps {
  [key: string]: never;
}

const App: React.FC<IProps> = () => {
  return (
    <Router>
      <Menu />
      <div style={{ maxWidth: "480px", margin: "auto", marginTop: "40px" }}>
        <Switch>
          <Route path="/fast-reward">
            <FastReward />
          </Route>
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
};

export default App;
