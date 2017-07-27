"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
const eratosthenes = function* () {
    const primes = [2];
    yield 2;
    for (let i = primes[primes.length - 1];; ++i) {
        if (primes.every(p => i % p !== 0)) {
            primes[primes.length] = i;
            yield i;
        }
    }
};

exports.eratosthenes = eratosthenes;