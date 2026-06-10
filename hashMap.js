export class HashMap {
  #capacity;
  #loadFactor;
  #buckets;

  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.75;
    this.#buckets = Array.from({ length: this.#capacity }, () => []);
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

  get(key) {
    const normalizedKey =
      typeof key === "object" ? JSON.stringify(key) : String(key);

    const hashCode = this.hash(normalizedKey);
    const bucket = this.#buckets[hashCode];

    for (const entry of bucket) {
      if (entry.key === normalizedKey) {
        return entry.value;
      }
    }

    return null;
  }
}
