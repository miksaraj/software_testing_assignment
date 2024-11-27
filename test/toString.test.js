import fc from 'fast-check';
import symbolArbitrary from './testHelpers.js';
import toString from "../src/toString.js";


test('toString should return an empty string for null and undefined', () => {
    fc.assert(
        fc.property(fc.constantFrom(null, undefined), (value) => {
            expect(toString(value)).toBe('');
        })
    )
})

test('toString should preserve the sign of -0', () => {
    expect(toString(-0)).toBe('-0');
    expect(toString(0)).not.toBe('-0');
})

test('toString should convert arrays to comma-separated strings', () => {
    fc.assert(
        fc.property(fc.array(fc.anything()), (arr) => {
            expect(toString(arr)).toBe(arr.join(','));
        })
    )
})

test('toString should convert symbols to strings', () => {
    fc.assert(
        fc.property(symbolArbitrary, (symbol) => {
            const expected = Symbol.prototype.toString.call(symbol);
            expect(toString(symbol)).toBe(expected);
        })
    )
})

test('toString should handle objects correctly', () => {
    fc.assert(
        fc.property(fc.object(), (obj) => {
            expect(toString(obj)).toBe('[object Object]');
        })
    )
})

test('toString should be idempotent for strings', () => {
    fc.assert(
        fc.property(fc.string(), (str) => {
            expect(toString(str)).toBe(str);
        })
    )
})
