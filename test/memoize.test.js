import fc from 'fast-check';
import memoize from '../src/memoize';

test('memoize should cache results for the same input', () => {
    const mockFn = jest.fn((x) => x * 2)
    const memoizedFn = memoize(mockFn)

    expect(memoizedFn(2)).toBe(4)
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(memoizedFn(2)).toBe(4)
    expect(mockFn).toHaveBeenCalledTimes(1)
})

test('memoize should use the first argument as the default cache key', () => {
    const mockFn = jest.fn((x, y) => x + y)
    const memoizedFn = memoize(mockFn)

    memoizedFn(2, 3)
    expect(memoizedFn.cache.has(2)).toBe(true)
})

test('memoize should use the resolver function to determine the cache key', () => {
    const mockFn = jest.fn((x) => x.length)
    const resolver = jest.fn((x) => x.join(','))
    const memoizedFn = memoize(mockFn, resolver)

    memoizedFn(['a', 'b'])
    expect(resolver).toHaveBeenCalledWith(['a', 'b'])
    expect(memoizedFn.cache.has('a,b')).toBe(true)
})

test('memoize should not recompute if the cache key is resolved', () => {
    const mockFn = jest.fn((x) => x.length)
    const resolver = jest.fn((x) => x.join(','))
    const memoizedFn = memoize(mockFn, resolver)

    memoizedFn(['a', 'b'])
    memoizedFn(['a', 'b'])
    expect(mockFn).toHaveBeenCalledTimes(1)
})

test('memoize should handle cache modifications', () => {
    const mockFn = jest.fn((x) => x * 2)
    const memoizedFn = memoize(mockFn)

    memoizedFn(2)
    memoizedFn.cache.set(2, 10)
    expect(memoizedFn(2)).toBe(10)
})

test('memoize should allow replacing the cache implementation', () => {
    memoize.Cache = WeakMap;
    const mockFn = jest.fn((x) => x * 2)
    const memoizedFn = memoize(mockFn)

    const obj = { a: 1 }
    memoizedFn(obj)
    expect(memoizedFn.cache.has(obj)).toBe(true)
    memoize.Cache = Map; // Reset the cache implementation
})

test('memoize should throw an error if the first argument is not a function', () => {
    expect(() => memoize('not a function')).toThrow(TypeError)
})

test('memoize should throw an error if the resolver is not a function', () => {
    expect(() => memoize(() => {}, 'not a function')).toThrow(TypeError)
})

test('memoize should return consistent results for the same input', () => {
    fc.assert(fc.property(fc.string(), (x) => {
        const mockFn = jest.fn((x) => x)
        const memoizedFn = memoize(mockFn)

        const res1 = memoizedFn(x)
        const res2 = memoizedFn(x)
        expect(res1).toBe(res2)

        expect(mockFn).toHaveBeenCalledTimes(1)
    }))
})

test('memoize should use the resolver for arbitrary keys', () => {
    fc.assert(fc.property(fc.array(fc.string()), (x) => {
        const mockFn = jest.fn((x) => x)
        const resolver = jest.fn((x) => x.join(','))
        const memoizedFn = memoize(mockFn, resolver)

        memoizedFn(x)
        expect(resolver).toHaveBeenCalledWith(x)
    }))
})