import { Component, OnInit } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { AsyncPipe, NgIf, NgOptimizedImage } from "@angular/common";
import { MatFormFieldModule, MatLabel, MatPrefix } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from "@angular/router";
import {selectAllUsers, selectUser } from "../../store/users.selectors";
import { Store } from "@ngrx/store";
import {
  MatAutocomplete,
  MatAutocompleteOrigin,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import { debounceTime, map, Observable } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { fetchUsers, getUser } from "../../store/users.actions";
import { AppState } from "../../store/app.state";
import { MatProgressBar } from "@angular/material/progress-bar";

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
    MatProgressBar,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isTyping = false;
  public users$ = this.store.select(selectAllUsers);
  public user$ = this.store.select(selectUser);
  options: Observable<any>;
  textPresent = false;
  searching = false;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUsers());
  }

  public filterUsers(ev: any) {
    this.searching = true;
    this.options = this.users$.pipe(debounceTime(500), map((users) => {
      this.textPresent = ev.value.length > 0;
      const searchValue = Number.parseInt(ev.value);
      this.searching = false;
      return users.filter(user => user.id === searchValue)
    }));
  }

  public typing(typing: boolean) {
    this.isTyping = typing;
  }

  clearInput(searchInput: HTMLFormElement) {
    searchInput.reset();
    this.textPresent = false;
  }

  goHome() {
    this.router.navigate([''])
  }
}
