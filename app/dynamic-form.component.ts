import { Input, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { FormData } from "./providers";
import { State } from "./reducers";
import { UserError } from "./user.service";


const NAME_REGEX = /^[A-zÀ-ú\- ñ]+$/i;
const USERNAME_REGEX = /^[A-z0-9_\.ñ]+$/i;

class DynamicFormComponent implements Iterable<FormControl> {
    controls: any;
    duplicateEmail: boolean = false;
    duplicateUsername: boolean = false;
    forced: boolean = false;
    form: FormGroup;
    @Input() isLoading: boolean;

    constructor(public formData: FormData) {}

    ngOnChanges(changes: SimpleChanges) {
        const {
            previousValue: wasLoading,
            currentValue: isLoading,
        } = changes.isLoading;

        if (wasLoading && !isLoading) {
            this.enable();
        } else if (!wasLoading && isLoading) {
            this.disable();
        }
    }

    computeProps() {
        throw new EvalError('Compute props not implemented!');
    }

    extractError(): any {
        throw new EvalError('Extract error not implemented!');
    }

    enable() {
        for (const control of this) { control.enable(); }
    }

    disable() {
        for (const control of this) { control.disable(); }
    }

    validate(controlKeys = Object.keys(this.controls)) {
        controlKeys.forEach(key => {
            const control: FormControl = this.controls[key];

            if (control) {
                control.updateValueAndValidity({ onlySelf: false });
            }
        });

        this.forced = false;
    }

    [Symbol.iterator]() : Iterator<FormControl> {
        const controls: Array<FormControl> = Object.values(this.controls);

        return {
            next: () : IteratorResult<FormControl> => {
                const value = controls.pop();
                const done = !value;

                return { value, done };
            },
        };
    }

    emailValidator(control: FormControl) {
        if (control.value.length === 0) { return null; }

        const result = Validators.email(control);

        if (result) {
            return { message: this.formData.validation.email };
        }

        return null;
    };

    nameValidator = (control: FormControl) => {
        const { value } = control;

        if (value.trim().length === 0 || NAME_REGEX.test(value)) { return null; }

        return { message: this.formData.validation.name };
    };

    passwordValidator = (control: FormControl, type: string) => {
        if (!this.form) { return null; }

        let partnerType = null;
        let confirmPassword = '';
        let password = '';

        if (type === 'password') {
            partnerType = 'confirmPassword';

            ({ value: password } = control);
            ({ confirmPassword } = this.form.value);
        } else {
            partnerType = 'password';

            ({ value: confirmPassword } = control);
            ({ password } = this.form.value);
        }

        if (this.controls[partnerType] && !this.forced) {
            this.forced = true;

            setImmediate(() => { this.validate([partnerType]); });
        }

        if ((!password || password.length === 0) ||
            (!confirmPassword || confirmPassword.length === 0) ||
            password === confirmPassword) {
            return null;
        }

        return { message: this.formData.validation.password };
    };

    usernameValidator(control: FormControl) {
        const { value } = control;

        if (value.length === 0 || USERNAME_REGEX.test(value)) { return null; }

        return { message: this.formData.validation.username };
    }
}

export default DynamicFormComponent;