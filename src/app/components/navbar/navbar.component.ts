import {Component, OnInit} from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { AsyncPipe, NgIf, NgOptimizedImage } from "@angular/common";
import { MatFormFieldModule, MatLabel, MatPrefix } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from "@angular/router";
import { selectAllUsers } from "../../store/users.selectors";
import { Store } from "@ngrx/store";
import {
  MatAutocomplete,
  MatAutocompleteOrigin,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import { debounceTime, map, Observable } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { fetchUsers } from "../../store/users.actions";
import { AppState } from "../../store/app.state";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    NgOptimizedImage,
    MatLabel,
    MatPrefix,
    RouterLink,
    MatAutocomplete,
    AsyncPipe,
    MatOption,
    ReactiveFormsModule,
    MatAutocompleteTrigger,
    FormsModule,
    NgIf,
    MatAutocompleteOrigin,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isTyping = false;
  public users$ = this.store.select(selectAllUsers);
  options: Observable<any>;
  textPresent = false;

  constructor(private store: Store<AppState>, private userService: UserService) {
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUsers());
  }

  public filterUsers(ev: any) {
    this.options = this.users$.pipe(debounceTime(500), map((users) => {
      console.log(ev.value, users)
      this.textPresent = ev.value.length > 0;
      const searchValue = Number.parseInt(ev.value);
      return  users.filter(user => user.id === searchValue)
    }));
  }

  public typing(typing: boolean) {
    this.isTyping = typing;
  }

  clearInput(searchInput: HTMLFormElement) {
    searchInput.reset();
    this.textPresent = false;
  }
}
