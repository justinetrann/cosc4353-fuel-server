const assert = require('assert');

require('../services/firebase.service');

const { updateUser, deleteUser, getUser } = require('../controllers/user.controller');

describe('Test create/get/update/delete user', () => {

    let uuid = 'testCUDUserProfile-unit-test';

    it('Create user', async () => {
        let data = {
            fullName: 'Walter White',
            address1: '308 Negra Arroyo Lane',
            address2: '308 Negra Arroyo Lane',
            city: 'Albuquerque',
            state: 'NM',
            zip: '87104'
        }
        await updateUser(uuid, data);
        console.log('Create user test successful!');
    })

    let userObj;

    it('Get user', async () => {
        userObj = await getUser(uuid);
        console.log('Get user test successful!');
    })

    it('Update user', async () => {
        let data = {
            ...userObj,
            fullName: 'Walter White Jr.'
        }
        await updateUser(uuid, data);
        console.log('Update user test successful!');
    })

    it('Delete user', async () => {
        await deleteUser(uuid);
        console.log('Delete user test successful!');
    })

    it('Check if user is deleted', async () => {
        let user = await getUser(uuid);
        assert(user === undefined, 'User still exists when it should have been deleted.');
    })
})