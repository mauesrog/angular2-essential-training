import { Action } from '@ngrx/store';
import { UserData } from '../reducers/user.reducer';
import { UserError } from '../user.service';

interface SignUpInput extends UserData { password: string }

export enum UserActionTypes {
    AuthenticationFailure = '[User] Authentication Failure',
    AuthenticationSuccess = '[User] Authentication Success',
    ClearError = '[User Clear Error',
    SignUp = '[User] Sign Up',
}

export class SignUp implements Action {
    readonly type = UserActionTypes.SignUp;

    constructor(public data: SignUpInput) {}
}

export class AuthenticationFailure implements Action {
    readonly type = UserActionTypes.AuthenticationFailure;

    constructor(public user: UserData, public error: UserError) {}
}

export class AuthenticationSuccess implements Action {
    readonly type = UserActionTypes.AuthenticationSuccess;

    constructor(public user: UserData, public token: string) {}
}

export class ClearError implements Action {
    readonly type = UserActionTypes.ClearError;

    constructor() {}
}

export type UserActions = SignUp | AuthenticationSuccess | AuthenticationFailure | ClearError; 