import { UserActions, UserActionTypes } from "../actions/user.actions";
import { UserError } from "../user.service";

export interface UserData {
    email: string,
    lastName: string,
    name: string,
    username: string,
}

export interface UserState {
    user: UserData,
    error: UserError,
}

export const initialState: UserState = {
    user: {
        email: null,
        lastName: null,
        name: null,
        username: null,
    },
    error: null,
};

export const userReducer = (state = initialState, action: UserActions): UserState => {
    switch (action.type) {
        case UserActionTypes.AuthenticationSuccess:
            localStorage.setItem('token', action.token);

            return { ...state, user: action.user };

        case UserActionTypes.AuthenticationFailure:
            return { ...state, error: action.error };

        case UserActionTypes.ClearError:
            return { ...state, error: null };

        default:
            return state;
    }
};