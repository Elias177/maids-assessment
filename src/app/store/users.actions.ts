import { createAction, props } from '@ngrx/store';
import { User } from "../models/user.model";

export const fetchUsers = createAction(
 'Getting users from User API'
);

export const fetchUsersSuccess = createAction(
  'Users Load - Success',
  props<{ users: User[] }>()
);

export const getUser = createAction(
  'Getting one user from User API',
  props<{ id: number }>()
);
export const searchForUser = createAction(
  'Searching for one user from User API',
  props<{ id: number }>()
);
export const searchUserSuccess = createAction(
  'Found user',
  props<{ user: User }>()
);

export const clearSearch = createAction(
  'Clearing Search'
);

export const getUserSuccess = createAction(
  'Load from User page',
   props<{ user: User }>()
);

export const getPage = createAction(
  'Getting current Page',
  props<{ page: number} >()
);

export const totalPages = createAction(
  'Setting total Pages',
  props<{ page: number} >()
);

export const nextPage = createAction(
  'Getting next Page'
);

export const previousPage = createAction(
  'Getting previous Page'
);
