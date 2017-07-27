// Returns a generator that sequentially generates every prime.
// Usage:
// > let primes = eratosthenes();
// > primes.next()
// { value: 2, done: false }
const eratosthenes = function *() {
    // Start with the first prime.
    const primes = [ 2 ];
    yield 2;
    
    // Check every successive number for primailty.
    for (let i = primes[primes.length - 1]; ; ++i) {
        // Since every prime less than i has already been found,
        // i is prime if and only if none of the primes found thusfar divide it.
        if (primes.every(p => i % p !== 0)) {
            // Record the newfound prime for use in generating the next prime.
            primes[primes.length] = i;
            yield i;
        }
    }
}

export { eratosthenes };