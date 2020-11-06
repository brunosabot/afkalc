import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Menu from "./functionnal/Menu";

const EliteSummon = lazy(() => import("./pages/EliteSummon/EliteSummon"));
const FastReward = lazy(() => import("./pages/FastReward/FastReward"));
const HeroList = lazy(() => import("./pages/HeroList/HeroList"));
const Home = lazy(() => import("./pages/Home/Home"));
const Loot = lazy(() => import("./pages/Loot/Loot"));
const SignatureItem = lazy(() => import("./pages/SignatureItem/SignatureItem"));

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
