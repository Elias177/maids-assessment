import { createSelector } from '@ngrx/store';
import { AppState } from "./app.state";
import { UsersState } from "./users.reducer";

export const selectUsers = (state: AppState) => state.users;
export const selectPage = (state: AppState) => state.users.page;
export const selectUserId = (state: AppState) => state.users.selectedUserId;
export const selectUser = (state: AppState) => state.users.selectedUser;

export const selectAllUsers = createSelector(
  selectUsers,
  (state: UsersState) => state.users
)
export const selectCurrentPage = createSelector(
  selectUsers,
  (state: UsersState) => state.page
)

export const selectTotalPages = createSelector(
  selectUsers,
  (state: UsersState) => state.totalPages
)
