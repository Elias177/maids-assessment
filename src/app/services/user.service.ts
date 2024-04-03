import { Injectable } from '@angular/core';
import {User} from "../models/user.model";
import {catchError, map, Observable, Subject, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentPage = new Subject();
  totalPages = new Subject();

  constructor(private http: HttpClient) { }

  getUsers(page: number): Observable<User[]> {
    return this.http.get<any>(
        'https://reqres.in/api/users', {
        params: {
          page: page
        }
      })
      .pipe(map((data) => {

        this.currentPage.next(data.page);

        this.totalPages.next(data.total_pages);

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
    )
      .pipe(map((user) => user.data || {}));
  }

  getUserPromise(id: number): Promise<User> {
    console.log(id)
    return new Promise(resolve => {
      this.http.get<{ data: User }>(
        'https://reqres.in/api/users', {
          params: {
            id: id
          }
        }
      ).subscribe(value => {
        resolve(value.data);
      })
    })
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
