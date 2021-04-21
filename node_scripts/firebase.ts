const admin = require("firebase-admin");

const serviceAccount = require("./key-prod.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://afkalc.firebaseio.com",
});

export default admin;
