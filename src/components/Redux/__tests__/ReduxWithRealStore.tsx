import thunk from "redux-thunk";
import { render, RenderOptions, screen, waitFor } from "@testing-library/react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import ReduxComponent from "../index";
import { initialState, reducer } from "../store/users.redux";
import { user1 } from "../../../constants/tests.constants";
import { getLoader } from "../../../utils/testUtils";

export interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  initialState?: Partial<ReturnType<typeof reducer>>;
}

const server = setupServer(
  rest.get(`https://jsonplaceholder.typicode.com/users`, (req, res, ctx) => {
    return res(ctx.json([user1]));
  }),
  rest.get(
    `https://jsonplaceholder.typicode.com/users/:id`,
    (req, res, ctx) => {
      return res(ctx.json(user1));
    }
  )
);

beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

const buildStore = (
  stateOverride: Partial<ReturnType<typeof reducer>> = {}
): ReturnType<typeof reducer> => ({
  user: { ...initialState.user, ...stateOverride.user },
  users: { ...initialState.users, ...stateOverride.users },
});

const renderWithRedux = (ui: JSX.Element, options?: ExtendedRenderOptions) => {
  return render(ui);
  // const store = createStore(
  //   reducer,
  //   buildStore(options?.initialState),
  //   applyMiddleware(thunk)
  // );
  // return render(<Provider store={store}>{ui}</Provider>, options);
};

describe("Testing redux width real store", () => {
  it("Should display loader", () => {
    renderWithRedux(<ReduxComponent />);
    getLoader();
  });

  it.skip("Should display empty state", () => {
    renderWithRedux(<ReduxComponent />, {
      initialState: { users: { data: [], status: "success" } },
    });
    screen.getByText(/no users/i);
  });

  it("Should display users", async () => {
    renderWithRedux(<ReduxComponent />, {
      initialState: { users: { data: [], status: "success" } },
    });

    await waitFor(() => {
      expect(screen.getAllByRole("card").length).toBeGreaterThan(0);
    });
  });
});
