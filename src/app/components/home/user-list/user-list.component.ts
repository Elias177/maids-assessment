import { Component, Input } from '@angular/core';
import { UserCardComponent } from "../user-card/user-card.component";
import {CommonModule} from "@angular/common";
import { User } from "../../../models/user.model";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    UserCardComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  @Input() users: User[];

}
