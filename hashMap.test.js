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

    test("throws type error for non-string key", () => {
      const hashMap = new HashMap();
      expect(() => hashMap.hash(-5)).toThrow(TypeError);
      expect(() => hashMap.hash([1, 2, 3])).toThrow(TypeError);
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

    test("throws type error for non-string key", () => {
      const hashMap = new HashMap();

      expect(() => hashMap.get(-5)).toThrow(TypeError);

      expect(() => hashMap.get([1, 2, 3])).toThrow(TypeError);
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

    test("updates the key value when setting with an existing key", () => {
      const hashMap = new HashMap();
      hashMap.set("Jon", "Snow");
      hashMap.set("Jon", "Targaryen");
      expect(hashMap.get("Jon")).toBe("Targaryen");
    });

    test("sets multiple key value pair through chaining", () => {
      const hashMap = new HashMap();
      hashMap.set("Tyrion", "Lannister").set("Jon", "Snow");
      expect(hashMap.get("Tyrion")).toBe("Lannister");
      expect(hashMap.get("Jon")).toBe("Snow");
    });

    test("sets a key value pair for anonymous instance", () => {
      expect(new HashMap().set("Tyrion", "Lannister").get("Tyrion")).toBe(
        "Lannister",
      );
    });

    test("sets a key value pairs with the same hash code", () => {
      const hashMap = new HashMap();
      hashMap.set("Rama", "RamaValue").set("Sita", "SitaValue");

      expect(hashMap.get("Rama")).toBe("RamaValue");
      expect(hashMap.get("Sita")).toBe("SitaValue");
    });

    test("throws type error for non-string key", () => {
      const hashMap = new HashMap();
      expect(() => hashMap.set(-5, "negative key value")).toThrow(TypeError);
      expect(() => hashMap.set([1, 2], "array key value")).toThrow(TypeError);
    });
  });

  describe("has method", () => {
    test("returns true for a key that's in the hash map", () => {
      const hashMap = new HashMap();
      hashMap.set("Jon", "Snow");
      expect(hashMap.has("Jon")).toBe(true);
    });

    test("returns true for a key that's in the hash map containing multiple nodes", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Arya", "Stark");
      expect(hashMap.has("Arya")).toBe(true);
    });

    test("retuns true for a key that's in the anonymous hash map", () => {
      expect(new HashMap().set("Jon", "Snow").has("Jon")).toBe(true);
    });

    test("returns false for a key that's not in the hash map", () => {
      const hashMap = new HashMap();
      expect(hashMap.has("Jon")).toBe(false);
    });

    test("retuns false for a key that's not in the hash map containing multiple nodes", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Arya", "Stark");
      expect(hashMap.has("Sansa")).toBe(false);
    });

    test("retuns false for a key that's not in the anonymous hash map", () => {
      expect(new HashMap().set("Jon", "Snow").has("Tyrion")).toBe(false);
    });
  });

  describe("remove(key) method", () => {
    test("removes 'Jon' entry from the hash map and returns true", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Arya", "Stark");

      expect(hashMap.remove("Jon")).toBe(true);
      expect(hashMap.has("Jon")).toBe(false);
    });

    test("removes 'Arya' entry from the hash map and returns true", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Arya", "Stark");

      expect(hashMap.remove("Arya")).toBe(true);
      expect(hashMap.has("Arya")).toBe(false);
    });

    test("removes 'Tyrion' entry from the hash map and returns true", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Arya", "Stark");

      expect(hashMap.remove("Tyrion")).toBe(true);
      expect(hashMap.has("Tyrion")).toBe(false);
    });

    test("removes 'Jon' entry from an anonymous hash map and returns true", () => {
      expect(
        new HashMap()
          .set("Jon", "Snow")
          .set("Tyrion", "Lannister")
          .set("Arya", "Stark")
          .remove("Jon"),
      ).toBe(true);
    });

    test("returns false for a 'Sansa' key that isn't in the hash map", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Arya", "Stark");

      expect(hashMap.remove("Sansa")).toBe(false);
    });

    test("returns false for a 'Cersei' key that isn't in the hash map", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Arya", "Stark");

      expect(hashMap.remove("Cersei")).toBe(false);
    });

    test("returns false for a 'Jon' for an empty hash map", () => {
      const hashMap = new HashMap();
      expect(hashMap.remove("Jon")).toBe(false);
    });

    test("returns false for a 'Jon' for an anonymous hash map", () => {
      expect(new HashMap().remove("Jon")).toBe(false);
    });
  });

  describe("length method", () => {
    test("returns 3 for the hash map containing 3 entries", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Arya", "Stark");

      expect(hashMap.length()).toBe(3);
    });

    test("returns 5 for the hash map containing 5 entries", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Arya", "Stark")
        .set("Jorah", "Mormont")
        .set("Samwell", "Tarly");

      expect(hashMap.length()).toBe(5);
    });

    test("returns 4 for the hash map containing 4 entries, when one bucket contains two entries", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Rama", "RamaValue")
        .set("Sita", "SitaValue");

      expect(hashMap.length()).toBe(4);
    });

    test("returns 2 for an anonymous hash map containing 2 entries", () => {
      expect(
        new HashMap().set("Jon", "Snow").set("Tyrion", "Lannister").length(),
      ).toBe(2);
    });

    test("returns 0 for an empty hash map", () => {
      const hashMap = new HashMap();
      expect(hashMap.length()).toBe(0);
    });

    test("returns 0 for an empty anonymous hash map", () => {
      expect(new HashMap().length()).toBe(0);
    });
  });

  describe("clear method", () => {
    test("removes all entries in the hash map containing 3 entries", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Arya", "Stark");

      hashMap.clear();

      expect(hashMap.length()).toBe(0);
    });

    test("removes all entries in the hash map containing 5 entries", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Arya", "Stark")
        .set("Jorah", "Mormont")
        .set("Samwell", "Tarly");

      hashMap.clear();

      expect(hashMap.length()).toBe(0);
    });

    test("removes all entries in the hash map containing 3 entries, including when one bucket contains two entries", () => {
      const hashMap = new HashMap();
      hashMap
        .set("Jon", "Snow")
        .set("Tyrion", "Lannister")
        .set("Rama", "RamaValue")
        .set("Sita", "SitaValue");

      hashMap.clear();

      expect(hashMap.length()).toBe(0);
    });

    test("don't fail for an empty hash map", () => {
      const hashMap = new HashMap();
      expect(() => hashMap.clear()).not.toThrow(Error);
    });
  });
});
