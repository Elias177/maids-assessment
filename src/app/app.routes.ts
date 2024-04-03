import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {UserPageComponent} from "./components/user-page/user-page.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user/:id', component: UserPageComponent},
  { path: '**', component: HomeComponent },

];
