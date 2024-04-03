import { Component, OnInit } from '@angular/core';
import { fetchUsers, getPage } from "../../store/users.actions";
import { selectAllUsers } from "../../store/users.selectors";
import { UserCardComponent } from "./user-card/user-card.component";
import { UserListComponent } from "./user-list/user-list.component";
import { AsyncPipe, NgIf } from "@angular/common";
import { Store } from '@ngrx/store';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { AppState } from "../../store/app.state";

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
  constructor(
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    const storedPage = sessionStorage.getItem('page');
    if (storedPage) {
      this.store.dispatch(getPage({page: Number.parseInt(storedPage)}));
    }
    this.store.dispatch(fetchUsers());
  }


}
