// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const functions = require("firebase-functions");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true }));

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

app.get("/test", (req, res) => {
    res.json({ message: "Hello from server!" });
});

exports.app = functions.https.onRequest(app)