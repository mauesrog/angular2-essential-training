import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";


@Injectable()
class RoutingService {
    private change = new Subject<string>();
    public activeRoute: Observable<string> = this.change.asObservable();

    ngOnInit() {
        this.change.next('about');
    }

    updateRoute(route: string) {
        this.change.next(route);
    }
}

export default RoutingService;