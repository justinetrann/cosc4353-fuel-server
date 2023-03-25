const db = require('../services/db.service');
let quoteColl = db.collection('fuel-quotes');

function getFuelPrice(){
    // TODO: Implement pricing module
    let price = 3;
    return price;
}

exports.calcFuelQuote = (gallonsRequested) => {

    if (!gallonsRequested){
        return {
            suggestedPrice: null,
            totalAmountDue: null
        }
    }

    let price = getFuelPrice();

    return {
        suggestedPrice: price,
        totalAmountDue: Number(gallonsRequested) * price
    }
}

exports.FuelQuote = ({ gallonsRequested, deliveryDate, deliveryAddress, id }) => {

    let quote = exports.calcFuelQuote(gallonsRequested);

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

exports.listFuelQuotes = async (uuid) => {
    let snapshot = await quoteColl.where('__name__', '>=', uuid).get();

    let docs = [];
    snapshot.forEach(doc => docs.push(doc.data()));
    return docs;
}