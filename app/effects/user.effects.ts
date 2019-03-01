import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { mergeMap, catchError, map } from "rxjs/operators";

import { UserActionTypes, SignUp, AuthenticationSuccess, AuthenticationFailure } from "../actions/user.actions";
import UserService, { AuthenticationResponse } from "../user.service";


@Injectable()
class UserEffects {
    constructor(private actions$: Actions<SignUp>, private user: UserService) {}

    @Effect()
    signUp$: Observable<any> = this.actions$.pipe(
        ofType(UserActionTypes.SignUp),
        mergeMap((action: SignUp) => {
            const { data: user } = action;
            const { password, ...userData } = user;

            const a: HttpErrorResponse = null;

            return this.user.signUp(user).pipe(
                map((res: HttpResponse<AuthenticationResponse>) => (
                    new AuthenticationSuccess(res.body.user, res.body.token)
                )),
                catchError((res: HttpErrorResponse) => (
                    of(new AuthenticationFailure(
                        userData,
                        { error: res.error.error, httpCode: res.status },
                    ))
                )),
            );
        }),
    )
}

export default UserEffects;