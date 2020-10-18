import React, { useContext } from "react";
import LoginButton from "../../components/ui/button/LoginButton";
import LogoutButton from "../../components/ui/button/LogoutButton";
import Card from "../../components/ui/card/Card";
import CardTitle from "../../components/ui/card/CardTitle";
import { FirebaseContext } from "../../FirebaseProvider";

const Home = () => {
  const { values } = useContext(FirebaseContext);

  return (
    <Card>
      <CardTitle>Welcome on Afkalc, the calculation tool for AFK Arena</CardTitle>
      {values.isAuth ? <LogoutButton /> : <LoginButton />}
    </Card>
  );
};

export default Home;
