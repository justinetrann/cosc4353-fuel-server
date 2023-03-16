const express = require('express');
const users = require('../controllers/user.controller');
const auth = require('../controllers/auth.controller');
const { getAuthToken } = require('../util/headers');
const { ForbiddenMessage } = require('../model/responses');
const router = express.Router();

// Update user profile
router.post('/profile', async (request, response, next) => {
    function forbidden(){
        response.status(403);
        response.json(new ForbiddenMessage());
    }

    if (!idToken){
        forbidden();
        return;
    }
    let uuid;
    try {
        uuid = await auth.getIdTokenSubject(idToken);
    }
    catch(e) {
        forbidden();
        return;
    }
    
    users.updateUser(uuid, body)
        .then(updatedData => response.json(updatedData))
        .catch(err => next(err))
})

router.get('/profile/', async (request, response, next) => {
    let idToken = getAuthToken(request);

    function forbidden(){
        response.status(403);
        response.json(new ForbiddenMessage());
    }

    if (!idToken){
        forbidden();
        return;
    }
    let uuid;
    try {
        uuid = await auth.getIdTokenSubject(idToken);
    }
    catch(e) {
        forbidden();
        return;
    }
    

    users.getUser(uuid)
    .then(data => response.json(data))
    .catch(err => next(err))
})

module.exports = router;