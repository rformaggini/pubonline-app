import { Injectable } from "@angular/core";
import { UserState } from "@models/user-state.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class UserStateService {
    userState = new BehaviorSubject<UserState>(new UserState());

    getUserState(){
        return this.userState.value;
    }

    setUserState(value: UserState){
        this.userState.next(value);
    }

}