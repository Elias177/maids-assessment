import { Component, Input } from '@angular/core';
import { MatCardContent, MatCardHeader, MatCardModule } from "@angular/material/card";
import { User } from "../../../models/user.model";
import { MatButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatButton,
    MatDivider
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() user: User;

}
