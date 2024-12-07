import map from "../src/map.js";

describe('map', () => {
    it('should work using the example given in the documentation', () => {
        // Arrange
        function square(n) {
            return n * n
        }
        const expected = [16, 64];

        // Act
        const result = map([4, 8], square);

        // Assert
        expect(result).toEqual(expected);
    });

    it('should return an empty array when given an empty array', () => {
        // Arrange
        const expected = [];

        // Act
        const result = map([], (x) => x);

        // Assert
        expect(result).toEqual(expected);
    });

    it('should throw an error when iteratee is not a function', () => {
        // Assert
        expect(() => map([1, 2, 3], null)).toThrow();
    });

    it('should return an array of the same length as the input array', () => {
        // Arrange
        const expected = 3;

        // Act
        const result = map([1, 2, 3], (x) => x);

        // Assert
        expect(result.length).toEqual(expected);
    });

    it('should throw an error with negative length arrays', () => {
        // Arrange
        const b = Object.create([]);
        b.length = -10;

        // Act & Assert
        expect(() => map(b, (x) => x)).toThrow();
    });

    it('should differentiate between manually assigned array length and actual length', () => {
        // Arrange
        const b = Object.create([1, 2, 3]);
        const expected = b.length;
        b.length = 10;

        // Act
        const result = map(b, (x) => x);

        // Assert
        expect(result.filter(x => x === undefined).length).toEqual(0);
        expect(result.length).toEqual(expected);
    });

    it('should handle sparse arrays correctly', () => {
        // Arrange
        const array = [1, , 3];
        const expected = [2, , 6];

        // Act
        const result = map(array, (x) => x * 2);

        // Assert
        expect(result).toEqual(expected);
    });

    it('should handle an iteratee that returns undefined for every element', () => {
        // Arrange
        const array = [1, 2, 3];
        const expected = [undefined, undefined, undefined];

        // Act
        const result = map(array, () => {});

        // Assert
        expect(result).toEqual(expected);
    });
});