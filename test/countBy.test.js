import countBy from '../src/countBy.js';

describe('countBy', () => {
    it('should return example value using the documented input', () => {
        // Arrange
        const users = [
            { 'user': 'barney', 'active': true },
            { 'user': 'betty', 'active': true },
            { 'user': 'fred', 'active': false }
        ];
        const expected = { 'true': 2, 'false': 1 };

        // Act
        const result = countBy(users, value => value.active);

        // Assert
        expect(result).toEqual(expected);
    });

    it('should return empty object when input is empty', () => {
        // Arrange
        const users = [];
        const expected = {};

        // Act
        const result = countBy(users, value => value.active);

        // Assert
        expect(result).toEqual(expected);
    });

    it('should work with an array of numbers', () => {
        // Arrange
        const array = [0, 1, 2, 3, 4, 5];
        const expected = { 'true': 5, 'false': 1 };

        // Act
        const result = countBy(array, value => value > 0);

        // Assert
        expect(result).toEqual(expected);
    });

    it('should differentiate between types', () => {
        // Arrange
        const array = ['a', 'b', 'c', 'd', 'e', 'f',
            1, 2, 3, 4, 5, 6];
        const expected = { 'true': 6, 'false': 6 };

        // Act
        const result = countBy(array, value => typeof value === 'number');

        // Assert
        expect(result).toEqual(expected);
    });

    it('should work with null and undefined types', () => {
        // Arrange
        const invalidCollection = { 'a': null, 'b': undefined, 'c': 123, 'd': {}, 'e': [] };
        const expected = { 'true': 3, 'false': 2 };

        // Act
        const result = countBy(invalidCollection, value => (typeof value !== undefined && typeof value !== null));

        // Assert
        expect(result).toEqual(expected);
    });
});
