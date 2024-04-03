import { createReducer, on } from '@ngrx/store';
import { User } from "../models/user.model";
import {
  fetchUsers,
  fetchUsersSuccess,
  getPage,
  getUser,
  getUserSuccess,
  nextPage,
  previousPage,
  totalPages
} from "./users.actions";

export interface UsersState {
  users: User[],
  selectedUserId: number;
  selectedUser: User | null;
  page: number;
  totalPages: number;
}

export const initialState: UsersState = {
  users: [],
  selectedUserId: 0,
  selectedUser: null,
  page: 1,
  totalPages: 1
};

export const usersReducer = createReducer(
  initialState,
  on(fetchUsers, (state) => ({...state})),
  on(fetchUsersSuccess, (state, {users}) => ({
    ...state,
    users: users
  })),
  on(getUser, (state, {id}) => ({
    ...state,
    selectedUserId: id
  })),
  on(getUserSuccess, (state, { user }) => ({
    ...state,
    selectedUser: user
  })),
  on(getPage, (state, { page }) => ({
    ...state,
    page: page
  })),
  on(totalPages, (state, { page }) => ({
    ...state,
    totalPages: page
  })),
  on(nextPage, (state) => ({
    ...state,
    page: state.page + 1
  })),
  on(previousPage, (state) => ({
    ...state,
    page: state.page - 1
  }))
);

