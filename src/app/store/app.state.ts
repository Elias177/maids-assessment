import { User } from "../models/user.model";
import {UsersState} from "./users.reducer";

export interface AppState {
  users: UsersState;
}
