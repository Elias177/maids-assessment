import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppState } from "./app.state";
import { Store } from "@ngrx/store";
import { UserService } from "../services/user.service";
import { fetchUsers, fetchUsersSuccess, getUser, getUserSuccess } from "./users.actions";
import {catchError, from, map, of, switchMap, withLatestFrom} from "rxjs";
import { selectPage, selectUserId } from "./users.selectors";
import { UsersState } from "./users.reducer";

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions,
              private store: Store<AppState>,
              private storeUser: Store<UsersState>,
              private userService: UserService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchUsers),
      withLatestFrom(this.store.select(selectPage)),
      switchMap(([_,page]) => from(this.userService.getUsers(page)).pipe(
        map((users) => fetchUsersSuccess({users: users}))
      ))
    )
  )
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUser),
      withLatestFrom(this.store.select(selectUserId)),
      switchMap(([_,id]) => from(this.userService.getUser(id)).pipe(
        map((user) => getUserSuccess({ user: user}))
      ) )
    )
  )
}
