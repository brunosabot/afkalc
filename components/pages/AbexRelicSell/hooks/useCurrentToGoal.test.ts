import { renderHook } from "@testing-library/react-hooks";
import HeroClass from "../../../../types/HeroClass";
import useCurrentToGoal from "./useCurrentToGoal";

describe("Test useCurrentToGoal", () => {
  it("For basic resources, should return the cost itself", () => {
    const { result } = renderHook(() =>
      useCurrentToGoal(
        {
          [HeroClass.ranger]: [0, 0, 0, 0, 0, 0],
          [HeroClass.mage]: [0, 0, 0, 0, 0, 0],
          [HeroClass.tank]: [0, 0, 0, 0, 0, 0],
          [HeroClass.warrior]: [0, 0, 0, 0, 0, 0],
          [HeroClass.support]: [0, 0, 0, 0, 0, 0],
        },
        {
          [HeroClass.ranger]: [0, 0, 0, 0, 0, 0],
          [HeroClass.mage]: [0, 0, 0, 0, 0, 0],
          [HeroClass.tank]: [0, 0, 0, 0, 0, 0],
          [HeroClass.warrior]: [0, 0, 0, 0, 0, 1106],
          [HeroClass.support]: [0, 0, 0, 0, 0, 0],
        }
      )
    );

    expect(result.current).toEqual([1106]);
  });

  it("For advanced resources, should return the cost itself", () => {
    const { result } = renderHook(() =>
      useCurrentToGoal(
        {
          [HeroClass.ranger]: [0, 0, 0, 0, 0, 0],
          [HeroClass.mage]: [0, 0, 0, 0, 0, 0],
          [HeroClass.tank]: [0, 0, 0, 0, 0, 0],
          [HeroClass.warrior]: [0, 0, 0, 0, 0, 0],
          [HeroClass.support]: [0, 0, 0, 0, 0, 0],
        },
        {
          [HeroClass.ranger]: [0, 0, 0, 0, 0, 0],
          [HeroClass.mage]: [0, 0, 0, 0, 0, 0],
          [HeroClass.tank]: [0, 0, 0, 0, 0, 0],
          [HeroClass.warrior]: [0, 0, 0, 0, 0, 5106],
          [HeroClass.support]: [0, 0, 0, 0, 0, 0],
        }
      )
    );

    expect(result.current).toEqual([1106, 2106, 3106, 4106, 5106]);
  });
});
