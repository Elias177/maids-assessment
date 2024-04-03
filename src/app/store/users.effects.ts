import { Injectable } from "@angular/core";
import {
  Actions,
  createEffect,
  ofType
} from "@ngrx/effects";
import { AppState } from "./app.state";
import { Store } from "@ngrx/store";
import { UserService } from "../services/user.service";
import {
  fetchUsers,
  fetchUsersSuccess,
  getUser,
  getUserSuccess,
  searchForUser,
  searchUserSuccess
} from "./users.actions";
import {
  catchError,
  from,
  map,
  of,
  switchMap,
  withLatestFrom
} from "rxjs";
import {
  selectPage,
  selectSearchedUserId,
  selectUserId
} from "./users.selectors";

@Injectable()
export class UsersEffects {

  constructor(private actions$: Actions,
              private store: Store<AppState>,
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
      ))
    )
  )

  searchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchForUser),
      withLatestFrom(this.store.select(selectSearchedUserId)),
      switchMap(([_,id]) => from(this.userService.getUser(id)).pipe(
        map((user) => searchUserSuccess({ user: user})),
        catchError(() => of(searchUserSuccess({user: {
            id: 0,
            email: "",
            first_name: "No User",
            last_name: "Found",
            avatar: ""
          }})))
      ))
    )
  )
}
