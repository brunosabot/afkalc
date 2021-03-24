import { fireEvent, render } from "@testing-library/react";
import React from "react";
import ButtonLevel from "./ButtonLevel";

// jest.mock("../../../../i18n");

describe("Test ButtonLevel component", () => {
  it("Should give the right level on click", async () => {
    const onClick = jest.fn();
    const { getByRole } = render(<ButtonLevel level={5} current={1} onClick={onClick} />);

    fireEvent.click(getByRole("button", {}));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(5);
  });
});
