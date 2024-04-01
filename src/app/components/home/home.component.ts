import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { fetchUsersAction } from "../../store/users.actions";
import { selectUsers } from "../../store/users.selectors";
import { UserCardComponent } from "./user-card/user-card.component";
import { UserListComponent } from "./user-list/user-list.component";
import { AsyncPipe } from "@angular/common";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    UserCardComponent,
    UserListComponent,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  users$ = this.store.select(selectUsers);

  constructor(private userService: UserService, private store: Store) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      console.log(users);
      this.store.dispatch(fetchUsersAction.retrievedUserList({ users }));
    })

  }


}
