import camelCase from '../src/camelCase.js';


test('First character should be lowercase', () => {
    // Arrange
    const upperCaseFirst = 'FooBar';
    const expected = 'fooBar';

    // Act
    const result = camelCase(upperCaseFirst);

    // Assert
    expect(result).toBe(expected);
});


test('Kebab case should be converted to camel case', () => {
    // Arrange
    const kebabCaseString = '--kebab-case--';
    const expected = 'kebabCase';

    // Act
    const result = camelCase(kebabCaseString);

    // Assert
    expect(result).toBe(expected);
});


test('Snake case should be converted to camel case', () => {
    // Arrange
    const snakeCaseString = '__snake_case__';
    const expected = 'snakeCase';

    // Act
    const result = camelCase(snakeCaseString);

    // Assert
    expect(result).toBe(expected);
});


test('Camelcase should not change', () => {
    // Arrange
    const camelCaseString = 'camelCase';
    const expected = 'camelCase';

    // Act
    const result = camelCase(camelCaseString);

    // Assert
    expect(result).toBe(expected);
});


test('Empty string should return empty string', () => {
    // Arrange
    const emptyString = '';
    const expected = '';

    // Act
    const result = camelCase(emptyString);

    // Assert
    expect(result).toBe(expected);
});


test('String with only numbers should return the same string', () => {
    // Arrange
    const onlyNumbers = '123456789';
    const expected = '123456789';

    // Act
    const result = camelCase(onlyNumbers);

    // Assert
    expect(result).toBe(expected);
});


test('String with extra whitespaces should be trimmed', () => {
    // Arrange
    const stringWithWhitespaces = '  white    space  ';
    const expected = 'whiteSpace';

    // Act
    const result = camelCase(stringWithWhitespaces);

    // Assert
    expect(result).toBe(expected);
});


test('String with multiple words should respect camelcase', () => {
    // Arrange
    const multipleWords = 'the quick brown fox jumps over the lazy dog';
    const expected = 'theQuickBrownFoxJumpsOverTheLazyDog';

    // Act
    const result = camelCase(multipleWords);

    // Assert
    expect(result).toBe(expected);
});


test('Passing an undefined type object should return empty string', () => {
    // Arrange
    const nullString = undefined;
    const expected = '';

    // Act
    const result = camelCase(nullString);

    // Assert
    expect(result).toBe(expected);
});


test('Passing a null type object should return empty string', () => {
    // Arrange
    const nullString = null;
    const expected = '';

    // Act
    const result = camelCase(nullString);

    // Assert
    expect(result).toBe(expected);
});

