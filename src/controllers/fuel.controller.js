const { calcFuelQuote } = require('../calc/fuel.calc');
const db = require('../services/db.service');
let quoteColl = db.collection('fuel-quotes');
const users = require('../controllers/user.controller');

exports.buildFuelQuote = async (userUUID, { gallonsRequested, deliveryDate, deliveryAddress, id }) => {

    let quotes = await this.listFuelQuotes(userUUID);
    let user = await users.getUser(userUUID);

    let currentPricePerGal = 1.5; // Hardcoded to $1.50 for now.

    let locationFactor = user.state;
    let rateHistoryFactor = quotes.length > 0 ? true : false;
    let companyProfitFactor = 0.10; // Hardcoded to 10% for now.

    let quote = calcFuelQuote(
        currentPricePerGal, gallonsRequested,
        locationFactor, rateHistoryFactor,
        companyProfitFactor
    );

    return {
        ...quote,
        gallonsRequested,
        deliveryDate: new Date(deliveryDate).toISOString().split("T")[0],
        deliveryAddress,
        id
    }
}

exports.updateFuelQuote = async (doc_id, { gallonsRequested, deliveryDate, deliveryAddress }) => {
    
    let uuid = String(doc_id).split('::')[0]; // Remove timestamp from right side
    console.debug('uuid:', uuid);

    let quote = await this.buildFuelQuote(uuid, {
        gallonsRequested,
        deliveryDate,
        deliveryAddress,
        id: doc_id
    });

    await quoteColl.doc(doc_id).set(quote);

    return quote;
}

exports.createFuelQuote = async (uuid, { gallonsRequested, deliveryDate, deliveryAddress }) => {
    let docID = uuid + '::' + (new Date().toISOString());
    let quote = await this.buildFuelQuote(uuid, {
        gallonsRequested,
        deliveryDate,
        deliveryAddress,
        id: docID
    });
    
    
    await quoteColl.doc(docID).set(quote);

    return quote;
}

exports.deleteFuelQuote = async (docID) => {
    await quoteColl.doc(docID).delete();
    return true;
}

exports.getFuelQuote = async (docID) => {
    let result = await quoteColl.doc(docID).get();
    return result.data();
}

exports.listFuelQuotes = async (uuid) => {
    let snapshot = await quoteColl.where('__name__', '<=', uuid).get();

    
    // Filter the documents by ID and uuid
    let docs = snapshot.docs.filter(doc => {
        let docUuid = doc.id.split('::')[0];
        return docUuid === uuid && doc.data().id.split('::')[0] === uuid;
    }).map(doc => doc.data());

    return docs;
}