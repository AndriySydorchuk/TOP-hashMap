export class HashMap {
  #capacity;
  #loadFactor;
  #buckets;

  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.75;
    this.#buckets = Array.from({ size: this.#capacity }, () => []);
  }

  hash(key) {
    const normalizedKey =
      typeof key === "object" ? JSON.stringify(key) : String(key);

    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < normalizedKey.length; i++) {
      hashCode =
        (primeNumber * hashCode + normalizedKey.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }
}
