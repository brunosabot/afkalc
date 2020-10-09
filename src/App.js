import React from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import SignatureItem from "./pages/SignatureItem/SignatureItem";
import EliteSummon from "./pages/EliteSummon/EliteSummon";
import Loot from "./pages/Loot/Loot";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";

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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
