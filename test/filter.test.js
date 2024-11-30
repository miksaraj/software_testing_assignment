import filter from "../src/filter.js";
import fc from "fast-check";

describe('filter', () => {
    it('should return elements for which the predicate is truthy', () => {
        const array = [1, 2, 3, 4, 5];
        const result = filter(array, (x) => x > 3);
        expect(result).toEqual([4, 5]);
    });

    it('should return an empty array if no elements match the predicate', () => {
        const array = [1, 2, 3];
        const result = filter(array, (x) => x > 10);
        expect(result).toEqual([]);
    });

    it('should return a new array and not modify the original', () => {
        const array = [1, 2, 3];
        const result = filter(array, (x) => x > 1);
        expect(result).toEqual([2, 3]);
        expect(array).toEqual([1, 2, 3]); // Ensure original is unchanged
    });

    it('should handle objects correctly', () => {
        const users = [
            { user: 'barney', active: true },
            { user: 'fred', active: false },
        ];
        const result = filter(users, ({ active }) => active);
        expect(result).toEqual([{ user: 'barney', active: true }]);
    })

    it('should return an empty array for an empty input array', () => {
        const result = filter([], (x) => x);
        expect(result).toEqual([]);
    });

    it('should return an empty array for an empty input array regardless of predicate', () => {
        fc.assert(
            fc.property(
                fc.compareBooleanFunc(), // Arbitrary predicates
                (predicate) => {
                    const result = filter([], predicate); // Empty input array
                    return result.length === 0; // Result should always be empty
                }
            )
        );
    });

    it('should handle sparse arrays correctly', () => {
        const array = [1, , 3, , 5]; // Sparse array
        const result = filter(array, (x) => x);
        expect(result).toEqual([1, 3, 5]);
    });

    it('should handle always-true and always-false predicates', () => {
        const array = [1, 2, 3];
        expect(filter(array, () => true)).toEqual([1, 2, 3]); // All elements
        expect(filter(array, () => false)).toEqual([]); // No elements
    });

    it('should invoke the predicate with (value, index, array)', () => {
        const mockPredicate = jest.fn((value, index, array) => value > 2);
        const array = [1, 2, 3];
        filter(array, mockPredicate);

        expect(mockPredicate).toHaveBeenCalledWith(1, 0, array);
        expect(mockPredicate).toHaveBeenCalledWith(2, 1, array);
        expect(mockPredicate).toHaveBeenCalledWith(3, 2, array);
    });
});
