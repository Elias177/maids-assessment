import { createReducer, on } from '@ngrx/store';
import { fetchUsersAction } from "./users.actions";
import { User } from "../models/user.model";


export const initialState: User[] = [];

export const usersReducer = createReducer(
  initialState,
  on(fetchUsersAction.retrievedUserList, (_state, { users }) => users)
);
