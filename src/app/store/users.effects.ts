import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "./app.state";
import { Store } from "@ngrx/store";
import { UserService } from "../services/user.service";
import {fetchUsers, fetchUsersSuccess, getUser, getUserSuccess} from "./users.actions";
import { from, map, switchMap } from "rxjs";

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private userService: UserService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsers),
      switchMap(() => from(this.userService.getUsers(1)).pipe(
        map((users) => fetchUsersSuccess({users: users}))
      ))
    )
  )
  /*loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      switchMap(() => from(this.userService.getUser(1)).pipe(
        map((users) => getUserSuccess({ id: users}))
      ))
    )
  )*/
}
