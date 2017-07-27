"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// Returns a generator that sequentially generates every prime from least to greatest.
const eratosthenes = function* () {
    // Start with the first prime.
    const primes = [2];
    yield primes[0];
    for (let i = primes[primes.length - 1];; ++i) {
        if (primes.every(p => i % p !== 0)) {
            primes[primes.length] = i;
            yield i;
        }
    }
};

exports.eratosthenes = eratosthenes;