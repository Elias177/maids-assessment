import { Injectable } from '@angular/core';
import { User } from "../models/user.model";
import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { UsersState } from "../store/users.reducer";
import { getPage, totalPages } from "../store/users.actions";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private userStore: Store<UsersState>) { }

  getUsers(page: number): Observable<User[]> {
    return this.http.get<any>(
        'https://reqres.in/api/users', {
        params: {
          page: page
        }
      })
      .pipe(map((data) => {
        this.userStore.dispatch(totalPages({page: data.total_pages}));
        this.userStore.dispatch(getPage({page: data.page}));
        sessionStorage.setItem('page', data.page);
        return data.data || [];
      }));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<{ data: User }>(
      'https://reqres.in/api/users', {
        params: {
          id: id
        }
      }
    ).pipe(map((user) => user.data || {}));
  }

}
