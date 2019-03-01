import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';
import { userReducer, UserState } from './user.reducer';


export interface State {
    user: UserState,
};

export const reducers: ActionReducerMap<State> = {
    user: userReducer,
};

export const metaReducers: MetaReducer<State>[] = [];