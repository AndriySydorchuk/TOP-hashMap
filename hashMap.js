export class HashMap {
  #capacity;
  #loadFactor;
  #buckets;

  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.75;
    this.#buckets = Array.from({ length: this.#capacity }, () => []);
  }

  #getBucket(index) {
    return this.#buckets[index];
  }

  #getEntry(key, bucket) {
    for (const entry of bucket) {
      if (entry.key === key) {
        return entry;
      }
    }

    return null;
  }

  hash(key) {
    if (typeof key !== "string")
      throw new TypeError("Invalid key type. Use string instead");

    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }

    return hashCode;
  }

  get(key) {
    const hashCode = this.hash(key);
    const bucket = this.#getBucket(hashCode);
    const entry = this.#getEntry(key, bucket);

    if (entry) {
      return entry.value;
    }

    return null;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    const bucket = this.#getBucket(hashCode);
    const entry = this.#getEntry(key, bucket);

    if (entry) {
      entry.value = value;
    } else {
      bucket.push({ key, value });
    }

    return this;
  }

  has(key) {
    const hashCode = this.hash(key);
    const bucket = this.#getBucket(hashCode);
    const entry = this.#getEntry(key, bucket);

    if (entry) {
      return true;
    }

    return false;
  }
}
