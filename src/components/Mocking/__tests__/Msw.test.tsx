import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";
import UsersContainer from "../index";
import { user1 } from "../../../constants/tests.constants";
import UserForm from "../UserForm";
import * as fetchUserModule from "../../../utils/fetchUser";

jest.mock("../../../utils/fetchUsers");

describe("Mocking example, with msw", () => {
  it("Should display loading when no users", async () => {
    render(<UsersContainer />);
    await waitFor(() => {
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it("Should display all users", async () => {
    render(<UsersContainer />);

    await waitFor(() => {
      expect(screen.getByText(user1.name)).toBeInTheDocument();
    });
  });

  it("Should get user by id", async () => {
    const fetchUserMockFn = jest
      .spyOn(fetchUserModule, "fetchUser")
      .mockImplementation(() => new Promise((res) => res(user1)));

    jest.spyOn(console, "log").mockImplementation(() => {});
    render(<UserForm />);

    const input = screen.getByPlaceholderText(/enter user id to fetch/i);

    userEvent.type(input, "2");

    expect(screen.getByPlaceholderText(/enter user id to fetch/i)).toHaveValue(
      2
    );

    const submit = screen.getByText("submit");

    userEvent.click(submit);

    await waitFor(() => {
      expect(fetchUserMockFn.mock.calls[0][0]).toEqual(2);
    });
  });
});

// const server = setupServer(
//   rest.get(`https://jsonplaceholder.typicode.com/users`, (req, res, ctx) => {
//     return res(ctx.json([user1]));
//   }),
//   rest.get(
//     `https://jsonplaceholder.typicode.com/users/:id`,
//     (req, res, ctx) => {
//       getUserFn(req.url.pathname);
//       return res(ctx.json(user1));
//     }
//   )
// );

// beforeAll(() => {
//   server.listen();
// });

// beforeEach(() => {
//   server.resetHandlers();
// });

// afterAll(() => {
//   server.close();
// });

// describe("Mocking example: monkey patch", () => {
//   it("Should display loading when no users", () => {
//     server.use(
//       rest.get(`https://jsonplaceholder.typicode.com/users`, (_, res, ctx) => {
//         return res(ctx.json(null));
//       })
//     );
//     render(<UsersContainer />);
//     expect(getLoader()).toBeInTheDocument();
//   });

//   it("Should display all users", async () => {
//     render(<UsersContainer />);

//     await waitFor(() => {
//       expect(getUserCardByName(user1.name)).toBeInTheDocument();
//     });
//   });

//   it("Should get user by id", async () => {
//     jest.spyOn(console, "log").mockImplementation(() => {});
//     render(<UserForm />);

//     userEvent.type(getUserInputId(), "2");

//     expect(getUserInputId()).toHaveValue(2);

//     userEvent.click(getSubmitButton());

//     await waitFor(() => {
//       expect(getUserFn).toBeCalledTimes(1);
//     });
//     await waitFor(() => {
//       expect(getUserFn).toBeCalledWith("/users/2");
//     });
//   });
// });
