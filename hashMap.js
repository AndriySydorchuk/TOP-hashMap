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
    const normalizedKey = this.#normalize(key);

    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < normalizedKey.length; i++) {
      hashCode =
        (primeNumber * hashCode + normalizedKey.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  get(key) {
    const normalizedKey = this.#normalize(key);

    const hashCode = this.hash(normalizedKey);
    const bucket = this.#buckets[hashCode];

    for (const entry of bucket) {
      if (entry.key === normalizedKey) {
        return entry.value;
      }
    }

    return null;
  }

  set(key, value) {
    const nomralizedKey = this.#normalize(key);
    const hashCode = this.hash(nomralizedKey);

    const bucket = this.#buckets[hashCode];
    for (const entry of bucket) {
      if (entry.key === nomralizedKey) {
        entry.value = value;
      }
    }

    bucket.push({
      key: nomralizedKey,
      value,
    });
  }

  #normalize(key) {
    return typeof key === "object" ? JSON.stringify(key) : String(key);
  }
}
