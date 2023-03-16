// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const functions = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const cors = require("cors");

// Initialize Firebase services
initializeApp();

// Routers
const userProfileRouter = require("./routes/user.route");
const { Ok } = require("./model/responses");

const app = express();

// Enable cors
app.use(cors({ origin: true }));

// User profile routes
app.use('/user', userProfileRouter)

// Root page
app.get("/", (req, res) => {
    res.json(new Ok());
});

// Export express app to Firebase Functions
exports.app = functions.https.onRequest(app)