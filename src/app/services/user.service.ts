import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Array<User>> {
    return this.http.get<{ data: User[] }>(
        'https://reqres.in/api/users?page=1'
      )
      .pipe(map((users) => users.data || []));
  }
}
