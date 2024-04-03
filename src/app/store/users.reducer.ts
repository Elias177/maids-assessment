import { createReducer, on } from '@ngrx/store';
import { User } from "../models/user.model";
import {
  clearSearch,
  fetchUsers,
  fetchUsersSuccess,
  getPage,
  getUser,
  getUserSuccess,
  nextPage,
  previousPage, searchForUser, searchUserSuccess,
  totalPages
} from "./users.actions";

export interface UsersState {
  users: User[],
  selectedUserId: number;
  searchedUserId: number;
  selectedUser: User | null;
  searchedUser: User | null;
  page: number;
  totalPages: number;
}

export const initialState: UsersState = {
  users: [],
  selectedUserId: 0,
  searchedUserId: 0,
  selectedUser: null,
  searchedUser: null,
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
  on(searchForUser, (state, {id}) => ({
    ...state,
    searchedUserId: id
  })),
  on(searchUserSuccess, (state, { user }) => ({
    ...state,
    searchedUser: user
  })),
  on(clearSearch, (state) => ({
    ...state,
    searchedUserId: 0,
    searchedUser: null
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

