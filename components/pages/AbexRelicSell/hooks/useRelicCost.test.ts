import { renderHook } from "@testing-library/react-hooks";
import useRelicCost from "./useRelicCost";

describe("Test useRelicCost", () => {
  it("For basic resources, should return the cost itself", () => {
    const { result } = renderHook(() => useRelicCost(1104));

    expect(result.current).toBe(1980);
  });

  it("For advanced resources, should return the cost itself", () => {
    const { result } = renderHook(() => useRelicCost(5506));

    expect(result.current).toBe(348000);
  });
});
