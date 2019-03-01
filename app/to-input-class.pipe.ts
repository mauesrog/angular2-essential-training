import { Pipe } from "@angular/core";


interface Classes { ready: boolean, invalid: boolean }

@Pipe({
    name: 'toInputClass',
})
class ToInputClassPipe {
    extrapolateClasses = (errors: any): Classes => {
        const ready = !errors;
        let invalid = false;

        if (!ready) { invalid = Boolean(errors.message); }

        return { ready, invalid };
    };

    extrapolateCoClasses = (thisErrors: any, otherErrors: any): Classes => ({
        ready: !thisErrors,
        invalid: [thisErrors, ...otherErrors].some(
            (errors) => (Boolean(errors && errors.message))
        ),
    });

    transform = (errors: any, otherErrors: any): Classes => (
        otherErrors.length ? this.extrapolateCoClasses(errors, otherErrors) :
                             this.extrapolateClasses(errors)
    );
};

export default ToInputClassPipe;