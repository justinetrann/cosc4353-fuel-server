const express = require('express');
const users = require('../controllers/user.controller');
const { Message } = require('../model/responses');
const { body, validationResult, oneOf } = require('express-validator');
const { getUserUUID } = require('../util/auth');
const usStates = require('../data/us-states');
const router = express.Router();

router.use(express.json())

const validate = (method) => {
    switch (method) {
      case 'updateProfile': {
       return [
            body('fullName').notEmpty().withMessage('Full Name is required.').trim()
                .isLength({ max: 50 }).withMessage('Full Name cannot exceed 50 characters.'),
            body('address1').notEmpty().withMessage('Address 1 is required.').trim()
                .isLength({ max: 100 }).withMessage('Address 1 cannot exceed 100 characters.'),
            body('address2').isLength({ max: 100 }).withMessage('Address 2 cannot exceed 100 characters.').trim(),
            body('city').notEmpty().trim().withMessage('City is required.')
                .isLength({ max: 100 }).withMessage('City cannot exceed 100 characters.'),
            body('state').notEmpty().withMessage('State is required.')
                .isIn(usStates).withMessage('State is an invalid value.'),
            body('zip').notEmpty().withMessage('Zip is required.').trim()
            .custom(val => {
                if (String(val).length !== 5 && String(val).length !== 9){
                    throw new Error("Zip must be 5 or 9 characters long.")
                }
                return true;
            })
         ]   
      }
    }
  }

// Update user profile
router.post('/profile', validate('updateProfile'), async (request, response, next) => {

    console.log(`Received body for url ${request.url}`, request.body);

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.mapped() });
    }

    let uuid = await getUserUUID(request, response);
    if (!uuid) return;

    let _body = request.body;

    let data = {
        fullName: _body.fullName,
        address1: _body.address1,
        address2: _body.address2,
        city: _body.city,
        state: _body.state,
        zip: _body.zip
    }
    
    users.updateUser(uuid, data)
        .then(updatedData => response.json(updatedData))
        .catch(err => next(err))
})

router.get('/profile/', async (request, response, next) => {
    let uuid = await getUserUUID(request, response);
    if (!uuid) return;

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