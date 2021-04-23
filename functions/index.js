const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

exports.firestoreCountProfileCreate = functions.firestore
  .document("/profile/{userId}")
  .onCreate(() => {
    const creationsRef = admin.database().ref("/counters/users");
    // Increment the number of lists created using the tool.
    return creationsRef
      .transaction((current) => {
        return current + 1;
      })
      .then(() => null);
  });
