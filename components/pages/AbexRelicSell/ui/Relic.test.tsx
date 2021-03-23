import { render } from "@testing-library/react";
import React from "react";
import Relic from "./Relic";

describe("Test Relic component", () => {
  it("Should render and display the counter", async () => {
    const { getByTestId } = render(
      <Relic quantity={1} setQuantity={() => {}} relic={1106} counter={1} level={5} />
    );

    expect(() => getByTestId("counter")).not.toThrow();
  });

  it("Should not render the counter if the value is zero", () => {
    const { getByTestId } = render(
      <Relic quantity={1} setQuantity={() => {}} relic={1106} counter={0} level={5} />
    );

    expect(() => getByTestId("counter")).toThrow();
  });
});
