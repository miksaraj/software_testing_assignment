import fc from "fast-check";

const symbolArbitrary = fc
    .string()
    .map((str) => Symbol(str));

export default symbolArbitrary;