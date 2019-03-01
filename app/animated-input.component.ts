import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'ps-animated-input',
    styleUrls: ['assets/stylesheets/forms.css', 'app/animated-input.component.css'],
    templateUrl: 'app/animated-input.component.html',
})
class AnimatedInputComponent {
    @Input() form: FormGroup;
    @Input() id: string;
    @Input() isLoading: boolean;
    @Input() otherIds: string[] = [];
    @Input() text: string;
    @Input() type: string;
    @Output('blurInput') blur = new EventEmitter();
    @Output('changeInput') change = new EventEmitter();
    @Output('focusInput') focus = new EventEmitter();
    @Output('keydownInput') keydown = new EventEmitter();

    onBlur() {
        if (this.type === "password") { return; }

        const { value: rawValue } = this.form.get(this.id);
        const update = Object.assign({}, this.form.value);

        update[this.id] = rawValue.replace(/  +/g, ' ').trim();

        this.form.setValue(update);
        this.blur.emit();
    }

    onChange(e: Event) {
        this.change.emit(e);
    }

    onFocus(e: FocusEvent) {
        (<HTMLInputElement>e.target).select();
        this.focus.emit(e);
    }

    onKeyDown(e: KeyboardEvent) {
        this.keydown.emit(e);
    }

    sharedErrors = (): any[] => (
        this.otherIds.map((otherId) => (this.form.get(otherId).errors))
    );
}

export default AnimatedInputComponent;