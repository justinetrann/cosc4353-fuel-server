const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    databaseURL: "https://fuel-7e52b-default-rtdb.firebaseio.com",
    credential: admin.credential.cert(serviceAccount)
});