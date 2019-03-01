import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[psInputError]',
})
class InputErrorDirective {
    @HostBinding('class.active') hasError: boolean = false;
    @HostBinding('innerHtml') errorMessage: string = '';

    @Input() set psInputError(errors) {
        if (errors && errors.message) {
            this.hasError = true;
            this.errorMessage = errors.message;
        } else {
            this.hasError = false;
            this.errorMessage = '';
        }
    }
}

export default InputErrorDirective;