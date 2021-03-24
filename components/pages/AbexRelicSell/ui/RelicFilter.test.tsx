import { fireEvent, render } from "@testing-library/react";
import React from "react";
import RelicFilter from "./RelicFilter";

// jest.mock("../../../../i18n");

describe("Test RelicFilter component", () => {
  it("Should give the right level on click", async () => {
    const onClick = jest.fn();
    const { rerender, getByRole } = render(<RelicFilter level={0} onClick={onClick} />);

    fireEvent.click(getByRole("button", {}));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(0);

    onClick.mockReset();

    rerender(<RelicFilter level={4} onClick={onClick} />);

    fireEvent.click(getByRole("button", {}));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(4);
  });
});
