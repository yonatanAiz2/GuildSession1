import { Dispatch } from "redux";
import { fetchUser } from "../../../utils/fetchUser";
import { fetchUsers } from "../../../utils/fetchUsers";

export enum UsersActions {
  GET_USERS_REQUEST = "GET_USERS_REQUEST",
  GET_USERS_SUCCESS = "GET_USERS_SUCCESS",
  GET_USERS_FAILURE = "GET_USERS_FAILURE",

  GET_USER_REQUEST = "GET_USER_REQUEST",
  GET_USER_SUCCESS = "GET_USER_SUCCESS",
  GET_USER_FAILURE = "GET_USER_FAILURE",
  USER_INIT = "USER_INIT",
}

export const getUsersRequest = () => ({ type: UsersActions.GET_USERS_REQUEST });

const getUsersSuccess = (users: User[]) => ({
  type: UsersActions.GET_USERS_SUCCESS,
  payload: users,
});

const getUsersFailure = (error: string) => ({
  type: UsersActions.GET_USERS_FAILURE,
  payload: error,
});

export const getUserRequest = () => ({ type: UsersActions.GET_USER_REQUEST });

const getUserSuccess = (user: User) => ({
  type: UsersActions.GET_USER_SUCCESS,
  payload: user,
});

const getUserFailure = (error: string) => ({
  type: UsersActions.GET_USER_FAILURE,
  payload: error,
});

export const userInit = () => ({
  type: UsersActions.USER_INIT,
});

interface GetUsersRequest {
  type: UsersActions.GET_USERS_REQUEST;
}

interface GetUsersSuccess {
  type: UsersActions.GET_USERS_SUCCESS;
  payload: User[];
}

interface GetUserRequest {
  type: UsersActions.GET_USER_REQUEST;
}

interface GetUserSuccess {
  type: UsersActions.GET_USER_SUCCESS;
  payload: User;
}

interface UserInit {
  type: UsersActions.USER_INIT;
}

interface GetUserFailure {
  type: UsersActions.GET_USER_FAILURE;
  payload: string;
}

interface GetUsersFailure {
  type: UsersActions.GET_USERS_FAILURE;
  payload: string;
}

export type UserActionTypes =
  | GetUsersRequest
  | GetUserRequest
  | GetUserSuccess
  | GetUsersSuccess
  | GetUsersFailure
  | GetUserFailure
  | UserInit;

export type Statuses = "success" | "pending" | "rejected" | "idle";

interface ReduxStateObject<T> {
  status: Statuses;
  error?: string;
  data: T;
}

export const initialState = {
  users: { data: [], status: "idle" } as ReduxStateObject<User[]>,
  user: { data: {}, status: "idle" } as ReduxStateObject<Partial<User>>,
};

export const reducer = (
  state = initialState,
  action: UserActionTypes
): typeof initialState => {
  switch (action.type) {
    case UsersActions.GET_USERS_REQUEST:
      return { ...state, users: { ...state.users, status: "pending" } };

    case UsersActions.GET_USERS_SUCCESS:
      return {
        ...state,
        users: { data: action.payload, status: "success", error: "" },
      };

    case UsersActions.GET_USERS_FAILURE:
      return {
        ...state,
        users: { data: [], status: "rejected", error: action.payload },
      };

    case UsersActions.GET_USER_REQUEST:
      return { ...state, user: { ...state.user, status: "pending" } };

    case UsersActions.GET_USER_SUCCESS:
      return {
        ...state,
        user: { data: action.payload, status: "success", error: "" },
      };

    case UsersActions.GET_USER_FAILURE:
      return {
        ...state,
        user: { data: {}, status: "rejected", error: action.payload },
      };

    case UsersActions.USER_INIT:
      return {
        ...state,
        user: { data: {}, status: "idle", error: "" },
      };

    default:
      return state;
  }
};

export function getUsersThunk() {
  return async function (dispatch: Dispatch) {
    dispatch(getUsersRequest());
    try {
      const users = await fetchUsers();
      dispatch(getUsersSuccess(users));
    } catch (e) {
      dispatch(getUsersFailure(e.message));
    }
  };
}

export function getUserThunk(id: number) {
  return async function (dispatch: Dispatch) {
    dispatch(getUserRequest());

    try {
      const user = await fetchUser(id);
      dispatch(getUserSuccess(user));
    } catch (e) {
      dispatch(getUserFailure(e.message));
    }
  };
}

export const usersSelector = (state: ReturnType<typeof reducer>) => state.users;
export const userSelector = (state: ReturnType<typeof reducer>) => state.user;
