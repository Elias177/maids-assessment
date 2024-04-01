import { Component } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { MatIcon } from "@angular/material/icon";
import { NgOptimizedImage } from "@angular/common";
import { MatLabel, MatPrefix } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isTyping = false;

  public typing(typing: boolean) {
    this.isTyping = typing;
  }

}
