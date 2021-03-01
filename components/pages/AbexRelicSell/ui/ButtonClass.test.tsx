import { fireEvent, render } from "@testing-library/react";
import React from "react";
import HeroClass from "../../../../types/HeroClass";
import ButtonClass from "./ButtonClass";

describe("Test ButtonClass component", () => {
  it("Should give the right class on click", async () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <ButtonClass theClass={HeroClass.ranger} current={HeroClass.mage} onClick={onClick} />
    );

    fireEvent.click(getByRole("button", {}));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(HeroClass.ranger);
  });

  it("Should render and display the current border", async () => {
    const { getByTestId } = render(
      <ButtonClass theClass={HeroClass.ranger} current={HeroClass.ranger} onClick={jest.fn()} />
    );

    expect(() => getByTestId("current")).not.toThrow();
  });

  it("Should not render the current border if the value is zero", () => {
    const { getByTestId } = render(
      <ButtonClass theClass={HeroClass.ranger} current={HeroClass.mage} onClick={jest.fn()} />
    );

    expect(() => getByTestId("current")).toThrow();
  });
});
