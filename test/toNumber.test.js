import fc from 'fast-check';
import symbolArbitrary from "./testHelpers.js";
import toNumber from "../src/toNumber.js";

test('toNumber should parse valid numeric strings correctly', () => {
    fc.assert(
        fc.property(fc.string(), (str) => {
            if (!isNaN(Number(str))) {
                expect(toNumber(str)).toBe(Number(str));
            }
        })
    )
})

test('toNumber should return Infinity or -Infinity for corresponding inputs', () => {
    expect(toNumber('Infinity')).toBe(Infinity);
    expect(toNumber('-Infinity')).toBe(-Infinity);
})

test('toNumber should handle Number.MIN_VALUE and Number.MAX_VALUE correctly', () => {
    expect(toNumber(Number.MIN_VALUE)).toBe(Number.MIN_VALUE);
    expect(toNumber(Number.MAX_VALUE)).toBe(Number.MAX_VALUE);
})

test('toNumber should return NaN for non-numeric strings', () => {
    fc.assert(
        fc.property(fc.string(), (str) => {
            if (isNaN(Number(str))) {
                expect(toNumber(str)).toBeNaN();
            }
        })
    )
})

test('toNumber should return the same value for numbers', () => {
    fc.assert(
        fc.property(fc.integer(), (num) => {
            expect(toNumber(num)).toBe(num);
        })
    )
})

test('toNumber should parse binary strings correctly', () => {
    fc.assert(
        fc.property(fc.string(), (str) => {
            if (str.startsWith('0b')) {
                expect(toNumber(str)).toBe(parseInt(str.slice(2), 2));
            }
        })
    )
})

test('toNumber should parse octal strings correctly', () => {
    fc.assert(
        fc.property(fc.string(), (str) => {
            if (str.startsWith('0o')) {
                expect(toNumber(str)).toBe(parseInt(str.slice(2), 8));
            }
        })
    )
})

test('toNumber should parse hexadecimal strings correctly', () => {
    fc.assert(
        fc.property(fc.string(), (str) => {
            if (str.startsWith('0x')) {
                expect(toNumber(str)).toBe(parseInt(str, 16));
            }
        })
    )
})

test('toNumber should return NaN for bad hexadecimal strings', () => {
    fc.assert(
        fc.property(fc.string(), (str) => {
            if (str.startsWith('-0x') || str.startsWith('+0x')) {
                expect(toNumber(str)).toBeNaN();
            }
        })
    )
})

test('toNumber should handle symbols correctly', () => {
    fc.assert(
        fc.property(symbolArbitrary, (symbol) => {
            expect(toNumber(symbol)).toBeNaN();
        })
    )
})

test('toNumber should handle objects correctly', () => {
    fc.assert(
        fc.property(fc.object(), (obj) => {
            expect(toNumber(obj)).toBeNaN();
        })
    )
})

test('toNumber should return the value as-is for non-string numbers' , () => {
    fc.assert(
        fc.property(fc.float(), (num) => {
            expect(toNumber(num)).toBe(num);
        })
    )
})

test('toNumber should convert non-string inputs using the unary + operator', () => {
    fc.assert(
        fc.property(fc.anything(), (val) => {
            expect(toNumber(val)).toBe(+val);
        })
    )
})