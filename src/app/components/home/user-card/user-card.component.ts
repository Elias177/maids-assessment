import { Component, Input } from '@angular/core';
import { MatCardContent, MatCardHeader, MatCardModule } from "@angular/material/card";
import { User } from "../../../models/user.model";
import { MatButton } from "@angular/material/button";
import { MatDivider } from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatSuffix} from "@angular/material/form-field";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatCardHeader,
    MatCardContent,
    MatButton,
    MatDivider,
    MatIcon,
    MatSuffix
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input() user: User;

}
