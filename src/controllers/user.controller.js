const db = require('../services/db.service');
let users = db.collection('users')

exports.updateUser = async (uuid, data) => {
    console.log(`Updating user profile for uuid '${uuid}'`, data);
    
    data.uuid = uuid;
    
    await users.doc(uuid).set(data);

    return data;
}

exports.getUser = async (uuid) => {
    let result = await users.doc(uuid).get();
    return result.data();
}