import { createReducer, on } from '@ngrx/store';
import { User } from "../models/user.model";
import {AppState} from "./app.state";
import {fetchUsers, fetchUsersSuccess, getUser, getUserSuccess} from "./users.actions";

export interface UsersState {
  users: User[],
  selectedUser: User | null;
}

export const initialState: UsersState = {
  users: [],
  selectedUser: null
};

export const usersReducer = createReducer(
  initialState,
  on(fetchUsers, (state) => ({...state})),
  on(fetchUsersSuccess, (state, {users}) => ({
    ...state,
    users: users
  })),
  on(getUser, (state) => ({...state})),
  on(getUserSuccess, (state, { id }) => ({
    ...state,
    selectedUser: state.users.find((user: User) => user.id === id) || null
  }))
);

