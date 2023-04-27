
/*
Requirements:


Create a pricing module that should calculate the price per gallon based on this formula.

Suggested Price = Current Price + Margin

Where,

Current price per gallon = $1.50 (this is the price what distributor gets from refinery and it varies based upon crude price. But we are keeping it constant for simplicity)
Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)

Consider these factors:
Location Factor = 2% for Texas, 4% for out of state.
Rate History Factor = 1% if client requested fuel before, 0% if no history (you can query fuel quote table to check if there are any rows for the client)
Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
Company Profit Factor = 10% always

Example:
1500 gallons requested, in state, does have history (i.e. quote history data exist in DB for this client)

Margin => (.02 - .01 + .02 + .1) * 1.50 = .195
Suggested Price/gallon => 1.50 + .195 = $1.695
Total Amount Due => 1500 * 1.695 = $2542.50

*/

/**
 * @param {number} currentPricePerGal 
 * @param {number} gallonsRequestedFactor 
 * @param {string} locationFactor e.g. TX, LA, CA, AZ
 * @param {boolean} rateHistoryFactor true if client requested fuel before, false if not
 * @param {number} companyProfitFactor Company Profit percentage (0.0 - 1.0)
 */
exports.calcFuelQuote = (currentPricePerGal, gallonsRequested, locationFactor, rateHistoryFactor, companyProfitFactor) => {

    let suggestedPrice = currentPricePerGal; // TODO: Implement rest of pricing module formula
    
    if (!gallonsRequested){
        return {
            suggestedPrice: null,
            totalAmountDue: null
        }
    }

    return {
        suggestedPrice: suggestedPrice,
        totalAmountDue: Number(gallonsRequested) * currentPricePerGal
    }
}