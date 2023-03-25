const assert = require('assert');
const { calcFuelQuote } = require('../calc/fuel.calc');

describe('Test calcFuelQuote.js', () => {
    it('GallonsRequested = 1, Price = 3', () => {
        let result = calcFuelQuote(1, 3);
        assert.equal(result.suggestedPrice, 3);
        assert.equal(result.totalAmountDue, 3)
    })
    it('GallonsRequested = 2, Price = 3', () => {
        let result = calcFuelQuote(2, 3);
        assert.equal(result.suggestedPrice, 3)
        assert.equal(result.totalAmountDue, 6)
    })
    it('GallonsRequested = 3, Price = 3', () => {
        let result = calcFuelQuote(3, 3);
        assert.equal(result.suggestedPrice, 3)
        assert.equal(result.totalAmountDue, 9)
    })
})