import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UsersContainer from "../index";
// import * as fetchUsersModule from "../../../utils/fetchUsers";
import * as fetchUserModule from "../../../utils/fetchUser";
import { user1 } from "../../../constants/tests.constants";
import UserForm from "../UserForm";

// const getUser = () => new Promise((res) => res(user1));
// const getUsers = () => new Promise((res) => res([user1]));

jest.mock("../../../utils/fetchUsers");

describe("Mocking example, with jest", () => {
  it("Should display loading when no users", () => {});

  it("Should display all users", () => {});

  it("Should get user by id", () => {});

  it("Button should be disabled on invalid user id input", () => {});
});

// const invalidInputs = [-1, 11, 0];

//   invalidInputs.map((invalidInput) =>
//     it(`button should be disabled when input is ${invalidInput}`, () => {
//       render(<UserForm />);

//       const input = screen.getByPlaceholderText(/enter user id to fetch/i);

//       userEvent.type(input, invalidInput.toString());

//       expect(screen.getByText("submit")).toBeDisabled();
//     })
//   );
