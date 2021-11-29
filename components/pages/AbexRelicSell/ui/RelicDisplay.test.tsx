import { fireEvent, render } from "@testing-library/react";
import React from "react";
import HeroClass from "../../../../types/HeroClass";
import RelicDisplay from "./RelicDisplay";

describe("Test RelicDisplay component", () => {
  it("Should give the right level on click", async () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <RelicDisplay position={1} theClass={HeroClass.ranger} active={0} onClick={onClick} />
    );

    fireEvent.click(getByRole("button", {}));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(1, "ranger", 1305);
  });
});
