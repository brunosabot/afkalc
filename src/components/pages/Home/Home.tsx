import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { FirebaseContext } from "../../providers/FirebaseProvider";
import LoginButton from "../../ui/button/LoginButton";
import LogoutButton from "../../ui/button/LogoutButton";
import Card from "../../ui/card/Card";
import CardTitle from "../../ui/card/CardTitle";

interface IProps {
  [key: string]: never;
}

const Home: React.FC<IProps> = () => {
  const { values } = useContext(FirebaseContext);

  return (
    <Card>
      <CardTitle>Welcome on Afkalc, the calculation tool for AFK Arena</CardTitle>
      {values.isAuth ? <LogoutButton /> : <LoginButton />}

      <div className="home-link__wrapper">
        <NavLink className="home-link" to="/signature-item">
          SI Emblem
        </NavLink>
        <NavLink className="home-link" to="/elite-summon">
          Elite summon
        </NavLink>
        <NavLink className="home-link" to="/loot">
          Loot
        </NavLink>
        <NavLink className="home-link" to="/hero-list">
          Hero List (Beta)
        </NavLink>
        <NavLink className="home-link" to="/fast-reward">
          Fast Reward
        </NavLink>
      </div>
    </Card>
  );
};

export default Home;
