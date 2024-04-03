import {createAction, createActionGroup, props} from '@ngrx/store';
import { User } from "../models/user.model";

export const fetchUsers = createAction(
 'Getting users from User API'
);

export const fetchUsersSuccess = createAction(
  'Users Load - Success',
  props<{ users: User[] }>()
);

export const getUser = createAction(
  'Getting one user from User API'
);

export const getUserSuccess = createAction(
  'Load from User page',
   props<{ id: number }>()
);
