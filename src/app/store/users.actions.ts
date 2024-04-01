import { createActionGroup, props } from '@ngrx/store';
import { User } from "../models/user.model";

export const fetchUsersAction = createActionGroup({
  source: 'User API',
  events: {
    'Retrieved User List': props<{ users: User[] }>(),
  },
});
