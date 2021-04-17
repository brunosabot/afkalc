const admin = require("firebase-admin");

const serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://afkalc-dev-default-rtdb.europe-west1.firebasedatabase.app",
});

export default admin;
