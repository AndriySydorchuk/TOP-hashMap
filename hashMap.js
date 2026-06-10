export class HashMap {
  #capacity;
  #loadFactor;
  #buckets;

  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.75;
    this.#buckets = Array.from({ length: this.#capacity }, () => []);
  }

  #getBucket(key) {
    const hashCode = this.hash(key);

    return this.#buckets[hashCode];
  }

  #getEntry(key, bucket) {
    for (const entry of bucket) {
      if (entry.key === key) return entry;
    }

    return null;
  }

  #isLoaded() {
    return this.length() > this.#capacity * this.#loadFactor;
  }

  #resize() {
    //store old key value pairs
    const entries = this.entries();

    //make new array
    this.#capacity *= 2;
    this.#buckets = Array.from({ length: this.#capacity }, () => []);

    //reset old key value pairs into new array
    entries.forEach((entry) => this.set(entry[0], entry[1]));
  }

  #collectProperty(property) {
    const collection = [];

    for (const bucket of this.#buckets) {
      for (const entry of bucket) {
        collection.push(entry[property]);
      }
    }

    return collection;
  }

  get capacity() {
    return this.#capacity;
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
    const bucket = this.#getBucket(key);
    const entry = this.#getEntry(key, bucket);

    if (entry) return entry.value;

    return null;
  }

  set(key, value) {
    const bucket = this.#getBucket(key);
    const entry = this.#getEntry(key, bucket);

    if (entry) {
      entry.value = value;
      return this;
    }

    bucket.push({ key, value });

    if (this.#isLoaded()) this.#resize();

    return this;
  }

  has(key) {
    const bucket = this.#getBucket(key);
    const entry = this.#getEntry(key, bucket);

    return entry ? true : false;
  }

  remove(key) {
    const bucket = this.#getBucket(key);
    const entry = this.#getEntry(key, bucket);

    if (!entry) return false;

    let index;
    for (index = 0; index < bucket.length; index++) {
      if (bucket[index].key === key) {
        break;
      }
    }

    bucket.splice(index, 1);

    return true;
  }

  length() {
    let length = 0;

    for (const bucket of this.#buckets) {
      for (const entry of bucket) {
        length++;
      }
    }

    return length;
  }

  clear() {
    for (const bucket of this.#buckets) {
      bucket.splice(0);
    }

    this.#capacity = 16;
  }

  keys() {
    return this.#collectProperty("key");
  }

  values() {
    return this.#collectProperty("value");
  }

  entries() {
    const entries = [];

    for (const bucket of this.#buckets) {
      for (const entry of bucket) {
        entries.push([entry.key, entry.value]);
      }
    }

    return entries;
  }
}
