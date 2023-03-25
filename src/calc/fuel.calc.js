
exports.calcFuelQuote = (gallonsRequested, fuelPrice) => {

    if (!gallonsRequested){
        return {
            suggestedPrice: null,
            totalAmountDue: null
        }
    }

    return {
        suggestedPrice: fuelPrice,
        totalAmountDue: Number(gallonsRequested) * fuelPrice
    }
}