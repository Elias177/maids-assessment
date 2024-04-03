import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import {fetchUsers, getPage} from "../../store/users.actions";
import {selectAllUsers, selectUsers} from "../../store/users.selectors";
import { UserCardComponent } from "./user-card/user-card.component";
import { UserListComponent } from "./user-list/user-list.component";
import {AsyncPipe, NgIf} from "@angular/common";
import { Store } from '@ngrx/store';
import {ActivatedRoute, Router} from "@angular/router";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UserCardComponent,
    UserListComponent,
    AsyncPipe,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  users$ = this.store.select(selectAllUsers);

  page: number;

  constructor(
    public userService: UserService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {


    const storedPage = sessionStorage.getItem('page');

    if (storedPage) {
      this.store.dispatch(getPage({page: Number.parseInt(storedPage)}));
    }

    this.store.dispatch(fetchUsers());



    /*this.page = Number.parseInt(this.route.snapshot.queryParamMap.get('page') || '1');

    this.userService.getUsers(this.page).subscribe((users) => {
      this.store.dispatch(fetchUsersAction.retrievedUserList({ users }));
    })*/
  }


  paginate(pagination: string) {
    console.log(pagination)
    if (pagination === 'n') {
      this.page++;
      this.router.navigate([''], {queryParams: {page: this.page}})
    }

  }
}
