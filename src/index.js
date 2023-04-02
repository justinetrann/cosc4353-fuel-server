/*

NOTICE:

Running this server will NOT work unless you put a serviceAccountKey.json file
into the src directory. This file is NOT stored in git as it can be a security risk.
To obtain a serviceAccountKey.json file, go to the firebase console, go to
Project settings > Service accounts and click "Generate new private key". Once this key is
generated it is up to you to keep track of it. If you lose it you have to regenerate it!
*/

const express = require("express");
const functions = require("firebase-functions");
const cors = require("cors");
require('./services/firebase.service');

// Routers
const userProfileRouter = require("./routes/user.route");
const fuelRouter = require("./routes/fuel.route");
const { Ok } = require("./model/responses");

const app = express();

// Enable cors
app.use(cors({ origin: true }));

// For express-validator
app.use(express.json());

// User profile routes
app.use('/user', userProfileRouter)

// Fuel routes
app.use('/fuel', fuelRouter)

// Root page
app.get("/", (req, res) => {
    res.json(new Ok());
});

// Export express app to Firebase Functions
exports.app = functions.https.onRequest(app)