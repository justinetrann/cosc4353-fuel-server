const { calcFuelQuote } = require('../calc/fuel.calc');
const db = require('../services/db.service');
let quoteColl = db.collection('fuel-quotes');

exports.getFuelPrice = () => {
    // TODO: Implement pricing module
    let price = 3;
    return price;
}

exports.FuelQuote = ({ gallonsRequested, deliveryDate, deliveryAddress, id }) => {

    let quote = calcFuelQuote(gallonsRequested, this.getFuelPrice());

    return {
        ...quote,
        gallonsRequested,
        deliveryDate: new Date(deliveryDate).toISOString().split("T")[0],
        deliveryAddress,
        id
    }
}

exports.updateFuelQuote = async (doc_id, { gallonsRequested, deliveryDate, deliveryAddress }) => {
    
    let quote = this.FuelQuote({
        gallonsRequested,
        deliveryDate,
        deliveryAddress,
        id: doc_id
    });

    await quoteColl.doc(doc_id).set(quote);

    return quote;
}

exports.createFuelQuote = async (uuid, { gallonsRequested, deliveryDate, deliveryAddress }) => {
    let docID = uuid + (new Date().toISOString());
    let quote = this.FuelQuote({
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
    let snapshot = await quoteColl.where('__name__', '>=', uuid).get();

    let docs = [];
    snapshot.forEach(doc => docs.push(doc.data()));
    return docs;
}