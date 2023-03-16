const express = require('express');
const users = require('../controllers/user.controller');
const auth = require('../controllers/auth.controller');
const { getAuthToken } = require('../util/headers');
const { ForbiddenMessage, Message } = require('../model/responses');
const router = express.Router();

// Update user profile
router.post('/profile', async (request, response, next) => {
    let idToken = getAuthToken(request);

    function forbidden(){
        response.status(403);
        response.json(new ForbiddenMessage());
    }

    if (!idToken){
        console.log('Invalid Authorization header: ' + (idToken || 'null'));
        forbidden();
        return;
    }
    let uuid;
    try {
        uuid = await auth.getIdTokenSubject(idToken);
    }
    catch(e) {
        console.log('ID token validation failed!', e);
        forbidden();
        return;
    }
    
    users.updateUser(uuid, request.body)
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
        console.log('Invalid Authorization header: ' + (idToken || 'null'));
        forbidden();
        return;
    }
    let uuid;
    try {
        uuid = await auth.getIdTokenSubject(idToken);
    }
    catch(e) {
        console.log('ID token validation failed!', e);
        forbidden();
        return;
    }
    

    users.getUser(uuid)
    .then(data => {
        if (!data){
            // User does not exist
            response.status(404)
            response.json(new Message('User profile data does not exist for this user.'));
            return;
        }
        response.json(data);
    })
    .catch(err => next(err))
})

module.exports = router;