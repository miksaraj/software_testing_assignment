jest.mock('../src/.internal/arrayLikeKeys.js', () => jest.fn());
import keys from '../src/keys.js';
import arrayLikeKeys from "../src/.internal/arrayLikeKeys.js";
import isArrayLike from "../src/isArrayLike.js";

describe('keys', () => {
    it('should return an empty array for an empty object', () => {
        // Arrange
        const emptyObject = {};
        const expected = [];

        // Act
        const result = keys(emptyObject);

        // Assert
        expect(result).toEqual(expected);
    });

    it('should return an array of keys for an object with keys', () => {
        // Arrange
        const object = { a: 1, b: 2 };
        const expected = ['a', 'b'];

        // Act
        const result = keys(object);

        // Assert
        expect(result).toEqual(expected);
    });

    it('should return only default keys for a prototype', () => {
        // Arrange
        function Foo() {
            this.a = 1;
            this.b = 2;
        }
        Foo.prototype.c = 3;
        const expected = ['a', 'b'];

        // Act
        const result = keys(new Foo);

        // Assert
        expect(result).toEqual(expected);
    });

    it('should call arrayLikeKeys inside the keys function with string input', () => {
        // Arrange
        const string = 'hi';
        const expected = ['0', '1'];
        arrayLikeKeys.mockReturnValue(expected);

        // Act
        const result = keys(string);

        // Assert
        expect(isArrayLike(string)).toBe(true);
        expect(result).toEqual(expected);
        expect(arrayLikeKeys).toHaveBeenCalledWith(string);
    });

    it('should call arrayLikeKeys inside the keys function for arraylike parameters', () => {
        // Arrange
        const array = [1, 2, 3];
        const expected = ['0', '1', '2'];
        arrayLikeKeys.mockReturnValue(expected);

        // Act
        const result = keys(array);

        // Assert
        expect(isArrayLike(array)).toBe(true);
        expect(result).toEqual(expected);
        expect(arrayLikeKeys).toHaveBeenCalledWith(array);
    });

    it('should return an empty array when passing non-arraylike or non object', () => {
        // Arrange
        const nonArrayLike = 1;
        const expected = Object.keys(Object(nonArrayLike));

        // Act
        const result = keys(nonArrayLike);

        // Assert
        expect(result).toEqual(expected);
    });

    it('should return an empty array when passing null', () => {
        // Arrange
        const nullValue = null;
        const expected = Object.keys(Object(nullValue));

        // Act
        const result = keys(nullValue);

        // Assert
        expect(result).toEqual(expected);
    });
});
