import { render } from "@testing-library/react";
import "jest-styled-components";
import Card from "..";
import { user1 } from "../../../constants/tests.constants";

describe("Card", () => {
  it("Should render card with persisted html and css", () => {
    const { container } = render(<Card {...user1} />);
    expect(true).toBeFalsy();
  });
});
