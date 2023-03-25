const { ForbiddenMessage, ProfileNotComplete } = require("../model/responses");
const { getAuthToken } = require("./headers");
const auth = require("../controllers/auth.controller");
const { getUser } = require("../controllers/user.controller");

exports.getUserUUID = async (request, response) => {
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
    try {
        return await auth.getIdTokenSubject(idToken);
    }
    catch(e) {
        console.log('ID token validation failed!', e);
        forbidden();
        return;
    }
}

exports.getUserProfile = async (request, response) => {
    let uuid = await this.getUserUUID(request, response);
    if (!uuid) return;

    let profile = await getUser(uuid);
    if (!profile){
        response.status(403);
        response.json(new ProfileNotComplete());
    }
    return profile;
}