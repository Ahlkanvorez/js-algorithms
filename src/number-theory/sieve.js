// Returns a generator that sequentially generates every prime.
// Usage:
// > let primesSequence = primes();
// > primesSequence.next()
// { value: 2, done: false }
const primes = function *() {
    const primes = [];
    // Check every successive number for primailty.
    for (let i = 2; ; ++i) {
        // Since every prime less than i has already been found,
        // i is prime if and only if none of the primes found thusfar divide it.
        if (primes.every(p => i % p !== 0)) {
            // Record the newfound prime for use in generating the next prime.
            primes[primes.length] = i;
            yield i;
        }
    }
}

export { primes };
