import { renderHook } from "@testing-library/react-hooks";
import useRelicLeft from "./useRelicLeft";

describe("Test useRelicLeft", () => {
  it("If possesed artefacts are empty, should return the cost", () => {
    const { result } = renderHook(() => useRelicLeft(1104, []));

    expect(result.current).toBe(1980);
  });

  it("It possesed artefact are not empty, should substract to the total", () => {
    const { result } = renderHook(() => useRelicLeft(2106, [1106, 1106]));

    expect(result.current).toBe(1500);
  });

  it("Should handle level 3 with levels 2", () => {
    const { result } = renderHook(() => useRelicLeft(3106, [2106, 2106]));

    expect(result.current).toBe(2400);
  });

  it("Should handle level 3 with levels 1", () => {
    const { result } = renderHook(() => useRelicLeft(3106, [1106, 1106, 1106, 1106]));

    expect(result.current).toBe(5400);
  });

  it("Should handle level 5 with levels 4", () => {
    const { result } = renderHook(() => useRelicLeft(5106, [4106, 4106, 4106]));

    expect(result.current).toBe(156000);
  });

  it("Should handle level 5 with levels 1", () => {
    const { result } = renderHook(() => useRelicLeft(5106, Array(36).fill(1106)));

    expect(result.current).toBe(278400);
  });
});
