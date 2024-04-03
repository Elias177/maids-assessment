import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from "../models/user.model";
import {AppState} from "./app.state";
import {UsersState} from "./users.reducer";

export const selectUsers = (state: AppState) => state.users;

export const selectAllUsers = createSelector(
  selectUsers,
  (state: UsersState) => state.users
)

export const selectUser = createSelector(
  selectUsers,
  (state: UsersState) => state.selectedUser
)

/*export const selectUser = createSelector(
  selectUsers,
  (users: User[]) => {
    return (id: number) => users.find((user: User) => user.id === id);
  }
);*/
