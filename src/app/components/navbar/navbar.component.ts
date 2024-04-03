import { Component, OnInit } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { AsyncPipe, NgIf, NgOptimizedImage } from "@angular/common";
import { MatLabel, MatPrefix } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from "@angular/router";
import { searchUser } from "../../store/users.selectors";
import { Store } from "@ngrx/store";
import {
  MatAutocomplete,
  MatAutocompleteOrigin,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import { debounceTime, map, Observable } from "rxjs";
import {clearSearch, getUser, searchForUser} from "../../store/users.actions";
import { AppState } from "../../store/app.state";
import { MatProgressBar } from "@angular/material/progress-bar";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIcon,
    MatInputModule,
    NgOptimizedImage,
    MatLabel,
    MatPrefix,
    RouterLink,
    MatAutocomplete,
    AsyncPipe,
    MatOption,
    MatAutocompleteTrigger,
    NgIf,
    MatAutocompleteOrigin,
    MatProgressBar,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isTyping = false;
  public user$ = this.store.select(searchUser);
  options: Observable<any>;
  textPresent = false;
  searching = false;

  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit(): void {
  }

  public filterUsers(ev: any) {
    this.searching = true;
    const searchValue = Number.parseInt(ev.value);
    if (Number.isNaN(searchValue)) {
      return;
    }
    this.store.dispatch(searchForUser({id: searchValue}))
    this.options = this.user$.pipe(debounceTime(500), map((user) => {
      this.textPresent = ev.value.length > 0;
      this.searching = false;
      return [user]
    }));
  }

  public typing(typing: boolean) {
    this.isTyping = typing;
    if (!typing) {
      this.store.dispatch(clearSearch());
    }
  }

  clearInput(searchInput: HTMLFormElement) {
    this.store.dispatch(clearSearch());
    searchInput.reset();
    this.textPresent = false;
  }

  goHome() {
    this.router.navigate([''])
  }

  goToUser(id: number) {
    this.store.dispatch(getUser({id: id}))
    this.router.navigate(['user', id])
  }
}
