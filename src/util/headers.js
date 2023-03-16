
/**
 * Gets idtoken from Authorization url
 * @param {Express.Request} request 
 */
exports.getAuthToken = (request) => {
    let authHeader = (request.headers.Authorization || '')
        .replace('Bearer ', '');
    return authHeader;
}