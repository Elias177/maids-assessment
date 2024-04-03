import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserCardComponent } from "../user-card/user-card.component";
import { CommonModule } from "@angular/common";
import { User } from "../../../models/user.model";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { fetchUsers, nextPage, previousPage } from "../../../store/users.actions";
import { selectCurrentPage, selectTotalPages } from "../../../store/users.selectors";
import { AppState } from "../../../store/app.state";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    UserCardComponent,
    MatButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  @Input() users: User[];
  @Output() pagination = new EventEmitter();
  public page$ = this.store.select(selectCurrentPage);
  public totalPage$ = this.store.select(selectTotalPages);

  constructor(public store: Store<AppState>) {
  }

  paginate(next: boolean) {

    if (next) {
      this.store.dispatch(nextPage())
    } else {
      this.store.dispatch(previousPage())
    }
    this.store.dispatch(fetchUsers())

  }
}
