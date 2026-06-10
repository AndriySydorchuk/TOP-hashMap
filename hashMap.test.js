import { HashMap } from "./hashMap";

describe("Testing HashMap behaviour", () => {
  describe("hash function", () => {
    test("returns hash code 11 for key Tyrion", () => {
      const hashMap = new HashMap();
      expect(hashMap.hash("Tyrion")).toBe(11);
    });

    test("returns hash code 10 for key Jaime", () => {
      const hashMap = new HashMap();
      expect(hashMap.hash("Jaime")).toBe(10);
    });

    test("returns hash code 7 for key Cersei", () => {
      const hashMap = new HashMap();
      expect(hashMap.hash("Cersei")).toBe(7);
    });

    test("returns hash code 0 for key ''", () => {
      const hashMap = new HashMap();
      expect(hashMap.hash("")).toBe(0);
    });

    test("returns hash code for non-string key ", () => {
      const hashMap = new HashMap();
      expect(hashMap.hash(-5)).toBe(8);
      expect(hashMap.hash([1, 2, 3])).toBe(10);
    });

    test("returns hash code on anonymous HashMap instance", () => {
      expect(new HashMap().hash("Cersei")).toBe(7);
    });
  });

  describe("get method", () => {
    test("returns value Lannister for key Tyrion", () => {
      const hashMap = new HashMap();
      hashMap.set("Tyrion", "Lannister");
      expect(hashMap.get("Tyrion")).toBe("Lannister");
    });

    test("returns value Snow for key Jon", () => {
      const hashMap = new HashMap();
      hashMap.set("Jon", "Snow");
      expect(hashMap.get("Jon")).toBe("Snow");
    });

    test("returns value Targaryen for key Daenerys", () => {
      const hashMap = new HashMap();
      hashMap.set("Daenerys", "Targaryen");
      expect(hashMap.get("Daenerys")).toBe("Targaryen");
    });

    test("returns null if a key is not found", () => {
      const hashMap = new HashMap();
      expect(hashMap.get("Arya")).toBe(null);
    });

    test("returns value for non-string key", () => {
      const hashMap = new HashMap();
      hashMap.set(-5, "negative key value");
      hashMap.set([1, 2, 3], "array key value");
      expect(hashMap.get(-5)).toBe("negative key value");
      expect(hashMap.get([1, 2, 3])).toBe("array key value");
    });
  });

  describe("set method", () => {
    test("sets a key value pair", () => {
      const hashMap = new HashMap();
      hashMap.set("Tyrion", "Lannister");
      expect(hashMap.get("Tyrion")).toBe("Lannister");
    });

    test("sets a two key value pair", () => {
      const hashMap = new HashMap();
      hashMap.set("Tyrion", "Lannister");
      hashMap.set("Jon", "Snow");
      expect(hashMap.get("Tyrion")).toBe("Lannister");
      expect(hashMap.get("Jon")).toBe("Snow");
    });

    test("sets a three key value pair", () => {
      const hashMap = new HashMap();
      hashMap.set("Tyrion", "Lannister");
      hashMap.set("Jon", "Snow");
      hashMap.set("Arya", "Stark");
      expect(hashMap.get("Tyrion")).toBe("Lannister");
      expect(hashMap.get("Jon")).toBe("Snow");
      expect(hashMap.get("Arya")).toBe("Stark");
    });

    test("updates the key value when setting with an existing key", () => {
      const hashMap = new HashMap();
      hashMap.set("Jon", "Snow");
      hashMap.set("Jon", "Targaryen");
      expect(hashMap.get("Jon")).toBe("Targaryen");
    });
  });
});
