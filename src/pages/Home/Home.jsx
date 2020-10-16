import React, { useContext } from "react";
import Card from "../../components/Card";
import { FirebaseContext } from "../../FirebaseProvider";

const Home = () => {
  const { actions, values } = useContext(FirebaseContext);

  return (
    <Card>
      <div style={{ padding: "16px", textAlign: "center" }}>Welcome</div>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        {values.isAuth ? (
          <button
            className="home__login-button"
            type="button"
            onClick={actions.logOut}
            style={{ textDecoration: "underline" }}
          >
            Se déconnecter
          </button>
        ) : (
          <button className="home__login-button" type="button" onClick={actions.logIn}>
            <img
              className="home__login-button-image"
              src="/google.png"
              height="46"
              alt="Connect with Google"
            />
          </button>
        )}
      </div>
    </Card>
  );
};

export default Home;
