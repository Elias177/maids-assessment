import {Component, EventEmitter, Input, Output} from '@angular/core';
import { UserCardComponent } from "../user-card/user-card.component";
import {CommonModule} from "@angular/common";
import { User } from "../../../models/user.model";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

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
  @Input() page: any;
  @Input() totalPages: any;

  @Output() pagination = new EventEmitter();

}
