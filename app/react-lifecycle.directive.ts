import { Directive, HostBinding } from "@angular/core";


@Directive({
    selector: '[psReactLifecycle]',
})
class ReactLifecycleDirective {
    @HostBinding('ngComponentWillReceiveProps2') ngComponentWillReceiveProps2 = (props) => {
        console.log("hi");
    };
}

export default ReactLifecycleDirective;