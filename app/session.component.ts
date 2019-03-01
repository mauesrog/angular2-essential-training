import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { State } from './reducers';
import { SignUp, ClearError } from './actions/user.actions';
import { UserData } from './reducers/user.reducer';
import { UserError } from './user.service';
import { sessionDataToken, SessionData } from './providers';
import RoutingService from './routing.service';


interface SessionProps {
    activeRoute?: string,
    user?: UserData,
    userError?: UserError,
    url?: any,
}

function mapStateToProps({ user: { user, error: userError } }: State) : SessionProps {
    return { user, userError };
}

@Component({
    selector: 'ps-session',
    styleUrls: ['assets/stylesheets/section.css', 'app/session.component.css'],
    templateUrl: 'app/session.component.html',
})
class SessionComponent {
    activeRoute: string = null;
    form: FormGroup = null;
    isLoading: boolean = false;
    spinnerClass: string = 'fa fa-spinner';
    url: string = null;
    user: UserData = null;
    userError: UserError = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private store: Store<State>,
        private routing: RoutingService,
        @Inject(sessionDataToken) private sessionData: SessionData,
    ) {
        store.select(mapStateToProps)
        .subscribe(this.ngComponentWillReceiveProps.bind(this));

        this.routing.activeRoute
        .subscribe(activeRoute => { this.ngComponentWillReceiveProps({ activeRoute }); });
    }

    ngOnInit() {
        const { sessionType, userType } = this.sessionData.defaults;

        this.form = this.formBuilder.group({
            sessionType: this.formBuilder.control(sessionType, Validators.required),
            userType: this.formBuilder.control(userType, Validators.required),
        });
        
        this.activatedRoute.url
        .subscribe(urls => { this.ngComponentWillReceiveProps({ url: urls[0].path }); });
    }

    ngComponentWillReceiveProps(props: SessionProps) {
        const prevProps = this.computeProps();
        const { user, url, userError, activeRoute } = props;

        if (user !== undefined) {
            this.user = user;
        }

        if (userError !== undefined) {
            this.userError = userError;
        }
        
        if (activeRoute !== undefined) {
            this.activeRoute = activeRoute;
        }

        if (url !== undefined) {
            this.url = url;
        }

        this.ngComponentDidUpdate(prevProps);
    }

    ngComponentDidUpdate(prevProps: SessionProps) {
        const {
            user: prevUser,
            userError: hadUserError,
            url: prevUrl,
        } = prevProps;

        if (prevUser !== this.user || !hadUserError && this.userError) {
            this.isLoading = false;
        }

        if (this.activeRoute !== this.url && this.url === 'join' &&
            prevUrl !== this.url) {
            this.routing.updateRoute(this.url);
        }
    }

    computeProps(): SessionProps {
        const { user, userError, url, activeRoute } = this;

        return { user, userError, url, activeRoute };
    }

    onClearError() {
        this.store.dispatch(new ClearError());
    }

    onSignUp(data) {
        this.onSubmit();
       
        this.store.dispatch(new SignUp(data));
    }

    onSubmit() {
        this.isLoading = true;
    }
};

export default SessionComponent;