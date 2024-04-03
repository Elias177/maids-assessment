import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { AsyncPipe, NgIf, NgOptimizedImage } from "@angular/common";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { getUser } from "../../store/users.actions";
import { selectUser } from "../../store/users.selectors";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatButton,
    MatCard,
    NgOptimizedImage,
    NgIf,
    MatProgressSpinner,
    AsyncPipe
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit{

  loadedUser$ = this.store.select(selectUser);

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = Number.parseInt(this.route.snapshot.paramMap?.get('id') || '1');
    this.store.dispatch(getUser({id: userId}))
  }

  goBack() {
    this.router.navigate([''])
  }
}
