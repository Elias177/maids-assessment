import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user.model";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard } from "@angular/material/card";
import { NgIf, NgOptimizedImage } from "@angular/common";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Location } from '@angular/common';

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
    MatProgressSpinner
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit{

  userId: number;

  loadedUser: User;

  constructor(private route: ActivatedRoute, private userService: UserService, public location: Location) {
  }

  ngOnInit(): void {

    this.userId = Number.parseInt(this.route.snapshot.paramMap?.get('id') || '1');

    this.userService.getUser(this.userId).subscribe(user => {
      this.loadedUser = user;
    })

  }


}
