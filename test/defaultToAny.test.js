import defaultToAny from "../src/defaultToAny.js";
import defaultTo from "../src/defaultTo.js";
import fc from "fast-check";

describe('defaultToAny', () => {
    it('should return the first valid value', () => {
        expect(defaultToAny(1, 10, 20)).toBe(1);
        expect(defaultToAny(undefined, 10, 20)).toBe(10);
        expect(defaultToAny(undefined, null, 20)).toBe(20);
    });

    it('should return NaN if it is the first valid value', () => {
        expect(defaultToAny(undefined, null, NaN)).toBe(NaN);
    });

    it('should fall back to the last default value if all are invalid', () => {
        expect(defaultToAny(undefined, null, undefined, null, NaN, 42)).toBe(42);
    });

    it('should return undefined if no values are valid and no defaults are provided', () => {
        expect(defaultToAny(undefined, null, NaN)).toBeNaN();
    });

    it('should handle diverse input types correctly', () => {
        expect(defaultToAny('string', 10, null)).toBe('string');
        expect(defaultToAny([], 10, null)).toEqual([]); // Empty array is valid
        expect(defaultToAny({}, 10, null)).toEqual({}); // Empty object is valid
    });

    it('should return the first non-NaN, non-null, non-undefined value', () => {
        fc.assert(
            fc.property(fc.array(fc.oneof(fc.anything(), fc.constant(null), fc.constant(undefined), fc.constant(NaN), fc.nat())), (values) => {
                const expected = values.find((val) => val !== null && val !== undefined && !Number.isNaN(val));
                expect(defaultToAny(...values)).toBe(expected);
            })
        );
    });

    it('should evaluate default values in order', () => {
        fc.assert(
            fc.property(
                fc.array(fc.oneof(fc.anything(), fc.constant(null), fc.constant(undefined))),
                fc.nat(),
                fc.nat(),
                (values, firstDefault, secondDefault) => {
                    const result = defaultToAny(...values, firstDefault, secondDefault);
                    const expected = [...values, firstDefault, secondDefault].find((val) => val !== null && val !== undefined && !Number.isNaN(val));
                    expect(result).toBe(expected);
                }
            )
        );
    });


});

describe('defaultToAny vs defaultTo', () => {
    it('should behave the same as defaultTo when two arguments are provided', () => {
        expect(defaultToAny(1, 10)).toBe(defaultTo(1, 10));
        expect(defaultToAny(undefined, 10)).toBe(defaultTo(undefined, 10));
        expect(defaultToAny(null, 10)).toBe(defaultTo(null, 10));
    });
});
