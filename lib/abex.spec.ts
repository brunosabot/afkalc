import { getRelicRank } from "./abex";

describe("Test Abex functions", () => {
  describe("Test getRelicRank", () => {
    it("Should handle empty rank", () => {
      expect(getRelicRank([0, 0, 0, 0, 0, 0])).toBe("");
    });
    it("Should basic rank update", () => {
      expect(getRelicRank([1100, 0, 0, 0, 0, 0])).toBe("1.1");
      expect(getRelicRank([4100, 0, 0, 0, 0, 0])).toBe("4.1");
      expect(getRelicRank([5100, 5100, 5100, 5100, 5100, 0])).toBe("5.5");
    });
    it("Should handle all filled rank", () => {
      expect(getRelicRank([4100, 4100, 4100, 4100, 4100, 4100])).toBe("5.0");
      expect(getRelicRank([5100, 5100, 5100, 5100, 5100, 5100])).toBe("5.6");
    });
    it("Should handle weird rank", () => {
      expect(getRelicRank([0, 1100, 2100, 3100, 4100, 5100])).toBe("5.1");
    });
  });
});
