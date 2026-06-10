import { HashMap } from "./hashMap";

describe("Testing HashMap behaviour", () => {
  describe("hash function", () => {
    test("hash function produces a hash code 11 from given key Tyrion", () => {
      const hashMap = new HashMap();
      expect(hashMap.hash("Tyrion")).toBe(11);
    });

    test("hash function produces a hash code 10 from given key Jaime", () => {
      const hashMap = new HashMap();
      expect(hashMap.hash("Jaime")).toBe(10);
    });

    test("hash function produces a hash code 7 from given key Cersei", () => {
      const hashMap = new HashMap();
      expect(hashMap.hash("Cersei")).toBe(7);
    });

    test("hash function produces a hash code 0 from given key ''", () => {
      const hashMap = new HashMap();
      expect(hashMap.hash("")).toBe(0);
    });

    test("hash function produces a hash code for given non-string key ", () => {
      const hashMap = new HashMap();
      expect(hashMap.hash(-5)).toBe(8);
      expect(hashMap.hash([1, 2, 3])).toBe(10);
    });

    test("hash function produces a hash code on anonymous HashMap instance", () => {
      expect(new HashMap().hash("Cersei")).toBe(7);
    });
  });
});
