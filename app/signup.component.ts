import { Component, Output, EventEmitter, Inject, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import DynamicFormComponent from './dynamic-form.component';
import { FormData, formDataToken } from './providers';
import { appendArgs } from './utils/index';
import { UserError } from './user.service';


@Component({
    selector: 'ps-signup',
    templateUrl: 'app/signup.component.html',
    styleUrls: ['assets/stylesheets/forms.css', 'assets/stylesheets/loading-forms.css', 'app/signup.component.css'],
})
class SignUpComponent extends DynamicFormComponent {
    @Input() userError: UserError;
    @Output() session: EventEmitter<any> = new EventEmitter();
    @Output() clearError = new EventEmitter();

    constructor(
        private formBuilder: FormBuilder,
        @Inject(formDataToken) public formData: FormData,
    ) {
        super(formData);
    }

    ngOnInit() {
        const value = '';
        const disabled = this.isLoading;
        const opts = { value, disabled };

        this.controls = {
            confirmPassword: this.formBuilder.control(
                opts,
                Validators.compose([
                    Validators.required,
                    appendArgs(this.passwordValidator, 'confirmPassword'),
                ]),
            ),
            email: this.formBuilder.control(
                opts,
                Validators.compose([Validators.required, (control) => (
                    this.emailValidator((<FormControl>control))
                )]),
            ),
            lastName: this.formBuilder.control(
                opts,
                Validators.compose([Validators.required, this.nameValidator]),
            ),
            name: this.formBuilder.control(
                opts,
                Validators.compose([Validators.required, this.nameValidator]),
            ),
            password: this.formBuilder.control(
                opts,
                Validators.compose([
                    Validators.required,
                    appendArgs(this.passwordValidator, 'password'),
                ]),
            ),
            username: this.formBuilder.control(
                opts,
                Validators.compose([Validators.required, (control) => (
                    this.usernameValidator((<FormControl>control))
                )]),
            ),
        };

        this.form = this.formBuilder.group(this.controls);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes.userError) { return; }

        const {
            previousValue: hadUserError,
            currentValue: userError,
        } = changes.userError;

        if (!hadUserError && userError) {
            const { httpCode, error: { data } } = userError;

            switch (httpCode) {
                case 409:
                    if (data === 'email') {
                        this.duplicateEmail = true;
                    } else if (data === 'username') {
                        this.duplicateUsername = true;
                    } else {
                        break;
                    }

                    this.validate([data]);
                    break;
                default: ;
            }
        } else if (hadUserError && !userError) {
            this.duplicateEmail = false;

            const { data } = hadUserError.error;

            if (data === 'email') {
                this.duplicateEmail = false;
                this.validate([data]);
            } else if (data === 'username') {
                this.duplicateUsername = false;
                this.validate([data]);
            }
        }
    }

    extractError(): UserError {
        return this.userError;
    }

    onChangeEmail() {
        if (this.userError) { this.clearError.emit(); }
    }

    onChangeUsername() {
        if (this.userError) { this.clearError.emit(); }
    }

    onSubmit() {
        const { value: { confirmPassword, ...data } } = this.form;

        this.session.emit(data);
    }

    emailValidator = (control: FormControl) => {
        const errors = super.emailValidator(control);

        if (errors) { return errors; }
        if (this.duplicateEmail) {
            return { message: this.formData.validation.duplicateEmail }
        }

        return null;
    };

    usernameValidator = (control: FormControl) => {
        const errors = super.usernameValidator(control);

        if (errors) { return errors; }
        if (this.duplicateUsername) {
            return { message: this.formData.validation.duplicateUsername }
        }

        return null;
    };
}

export default SignUpComponent;