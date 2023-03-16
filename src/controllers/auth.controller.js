const admin = require('firebase-admin');

const auth = admin.auth();

exports.getIdTokenSubject = async (idToken) => {
    let result = await auth.verifyIdToken(idToken);
    return result.sub;
}