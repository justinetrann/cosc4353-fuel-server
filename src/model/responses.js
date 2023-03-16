
class Message {

    /**
     * Create a basic message response in JSON
     * @param {string} message 
     */
    constructor(message){
        this.message = message;
    }
}

exports.Message = Message;

exports.ForbiddenMessage = class extends Message {

    /**
     * Forbidden response JSON
     */
    constructor(){
        super('Forbidden');
    }
}

/**
 * Creates an { ok: true } status response
 * @returns 
 */
exports.Ok = class {
    constructor(){
        this.ok = true;
    }
}