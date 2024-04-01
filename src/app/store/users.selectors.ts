import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from "../models/user.model";

export const selectUsers = createFeatureSelector<User[]>('users');

export const selectUser = createSelector(
  selectUsers,
  (users: User[]) => {
    return users.map((id: any) => users.find((user: User) => user.id === id)!);
  }
);
