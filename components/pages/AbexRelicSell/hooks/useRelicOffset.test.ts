import { renderHook } from "@testing-library/react-hooks";
import useRelicOffset from "./useRelicOffset";

describe("Test useRelicOffset", () => {
  it("If relic list is empty, return empty relic offset", () => {
    const { result } = renderHook(() => useRelicOffset([1104], []));

    expect(result.current).toEqual([]);
  });

  it("If relic list match the artefact, return empty relic offset", () => {
    const { result } = renderHook(() => useRelicOffset([2106], [1106, 1106]));

    expect(result.current).toEqual([]);
  });

  it("If relic list match the artefact, return empty relic offset from level 5 to 1", () => {
    const { result } = renderHook(() => useRelicOffset([5106], Array(36).fill(1106)));

    expect(result.current).toEqual([]);
  });

  it("If relic list doest not match the artefact, return the relic list", () => {
    const { result } = renderHook(() => useRelicOffset([2106], [1406, 1406]));

    expect(result.current).toEqual([1406, 1406]);
  });

  it("If relic list partially match the artefact, return part of the relic list", () => {
    const { result } = renderHook(() => useRelicOffset([2106], [1106, 1106, 1406, 1406]));

    expect(result.current).toEqual([1406, 1406]);
  });

  it("If relic list match the artefacts, return empty relic offset", () => {
    const { result } = renderHook(() => useRelicOffset([2106, 2406], [1106, 1106, 1406, 1406]));

    expect(result.current).toEqual([]);
  });

  it("If relic list match the artefacts, return empty relic offset from level 5 to 1", () => {
    const { result } = renderHook(() =>
      useRelicOffset([5106, 5406], [...Array(36).fill(1106), ...Array(36).fill(1406)])
    );

    expect(result.current).toEqual([]);
  });

  it("If relic list partially match the artefact, return part of the relic list", () => {
    const { result } = renderHook(() =>
      useRelicOffset([5106, 5406], [...Array(36).fill(1106), ...Array(36).fill(1406), 2305])
    );

    expect(result.current).toEqual([2305]);
  });
});
