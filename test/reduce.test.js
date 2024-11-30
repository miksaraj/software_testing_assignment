import reduce from "../src/reduce.js";

describe('reduce', () => {
    it('should sum an array of numbers with an initial accumulator', () => {
        const result = reduce([1, 2, 3], (sum, n) => sum + n, 0);
        expect(result).toBe(6);
    });

    it('should sum an array of numbers without an initial accumulator', () => {
        const result = reduce([1, 2, 3], (sum, n) => sum + n);
        expect(result).toBe(6);
    });

    it('should handle objects correctly', () => {
        const result = reduce(
            { a: 1, b: 2, c: 1 },
            (acc, value, key) => {
                (acc[value] || (acc[value] = [])).push(key);
                return acc;
            },
            {}
        );
        expect(result).toEqual({ 1: ['a', 'c'], 2: ['b'] });
    });

    it('should use the first element as the accumulator if none is provided', () => {
        const result = reduce([10, 20, 30], (sum, n) => sum + n);
        expect(result).toBe(60); // 10 + 20 + 30
    });

    it('should return the accumulator for an empty collection', () => {
        const result = reduce([], (sum, n) => sum + n, 100);
        expect(result).toBe(100);
    });

    it('should handle empty arrays without an initial accumulator', () => {
        const result = reduce([], (sum, n) => sum + n);
        expect(result).toBeUndefined(); // No initial value, no elements
    });

    it('should handle sparse arrays correctly', () => {
        const result = reduce([, 1, , 2], (sum, n) => sum + (n || 0), 0); // Handle missing values as 0
        expect(result).toBe(3);
    });

    it('should handle objects with undefined or null values', () => {
        const result = reduce(
            { a: 1, b: null, c: undefined, d: 2 },
            (acc, value, key) => {
                if (value != null) acc.push(key);
                return acc;
            },
            []
        );
        expect(result).toEqual(['a', 'd']); // Only keys with non-null/undefined values
    });

    it('should pass the correct arguments to the iteratee for arrays', () => {
        const mockIteratee = jest.fn((acc, value, index, collection) => acc + value);
        reduce([1, 2, 3], mockIteratee, 0);
        expect(mockIteratee).toHaveBeenCalledWith(0, 1, 0, [1, 2, 3]);
        expect(mockIteratee).toHaveBeenCalledWith(expect.anything(), 2, 1, [1, 2, 3]);
        expect(mockIteratee).toHaveBeenCalledWith(expect.anything(), 3, 2, [1, 2, 3]);
    });

    it('should pass the correct arguments to the iteratee for objects', () => {
        const mockIteratee = jest.fn((acc, value, key, obj) => acc + value);
        reduce({ a: 1, b: 2 }, mockIteratee, 0);
        expect(mockIteratee).toHaveBeenCalledWith(0, 1, 'a', { a: 1, b: 2 });
        expect(mockIteratee).toHaveBeenCalledWith(expect.anything(), 2, 'b', { a: 1, b: 2 });
    });
});
