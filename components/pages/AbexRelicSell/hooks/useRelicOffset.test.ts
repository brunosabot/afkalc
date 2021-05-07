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

  it("Bug #1", () => {
    const { result } = renderHook(() =>
      useRelicOffset(
        [
          3104,
          3105,
          3106,
          3201,
          3202,
          3202,
          3203,
          3203,
          3204,
          3204,
          3205,
          3205,
          3206,
          3304,
          3305,
          3404,
          4104,
          4105,
          4106,
          4201,
          4202,
          4203,
          4203,
          4204,
          4204,
          4204,
          4205,
          4205,
          4206,
          4305,
          4404,
          4504,
          4505,
          4506,
          5202,
          5204,
          5204,
          5205,
          5205,
          5206,
          5306,
        ],
        [
          2106,
          2201,
          2201,
          2202,
          2305,
          2306,
          2504,
          2504,
          2505,
          2506,
          2506,
          3104,
          3104,
          3105,
          3105,
          3105,
          3106,
          3106,
          3201,
          3201,
          3202,
          3203,
          3203,
          3203,
          3204,
          3204,
          3205,
          3206,
          3206,
          3206,
          3206,
          3304,
          3304,
          3305,
          3305,
          3404,
          3405,
          3405,
          3505,
          3506,
        ]
      )
    );

    expect(result.current).toEqual([3405]);
  });
});
