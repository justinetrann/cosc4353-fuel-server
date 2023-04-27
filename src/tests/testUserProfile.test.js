const assert = require('assert');

require('../services/firebase.service');

const { updateUser, deleteUser, getUser } = require('../controllers/user.controller');

describe('Test create/get/update/delete user', () => {

    let uuid = 'TestFuelQuoteUnitTest';

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
    })

    let userObj;

    it('Get user', async () => {
        userObj = await getUser(uuid);
    })

    it('Update user', async () => {
        let data = {
            ...userObj,
            fullName: 'Walter White Jr.'
        }
        await updateUser(uuid, data);
    })

    it('Delete user', async () => {
        await deleteUser(uuid);
    })

    it('Check if user is deleted', async () => {
        let user = await getUser(uuid);
        assert(user === undefined, 'User still exists when it should have been deleted.');
    })
})