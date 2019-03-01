import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import RoutingService from "./routing.service";

interface StoreComponentProps {
    activeRoute?: string,
    url?: string,
}


@Component({
    selector: 'ps-store',
    templateUrl: 'app/store.component.html',
    styleUrls: ['assets/stylesheets/section.css', 'app/store.component.css'],
})
class StoreComponent {
    activeRoute: string = null;
    url: string = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private routing: RoutingService,
    ) {
        this.routing.activeRoute
        .subscribe(activeRoute => { this.ngComponentWillReceiveProps({ activeRoute }); });
    }

    ngOnInit() {
        this.activatedRoute.url
        .subscribe(urls => { this.ngComponentWillReceiveProps({ url: urls[0].path }); });
    }

    ngComponentWillReceiveProps(props: StoreComponentProps) {
        const prevProps = this.computeProps();
        const { url, activeRoute } = props;
        
        if (activeRoute !== undefined) {
            this.activeRoute = activeRoute;
        }

        if (url !== undefined) {
            this.url = url;
        }

        this.ngComponentDidUpdate(prevProps);
    }

    ngComponentDidUpdate(prevProps: StoreComponentProps) {
        const { url: prevUrl } = prevProps;

        if (this.activeRoute !== this.url && this.url === 'store' &&
            prevUrl !== this.url) {
            this.routing.updateRoute(this.url);
        }
    }

    computeProps(): StoreComponentProps {
        const { activeRoute, url } = this;

        return { activeRoute, url };
    }
}

export default StoreComponent;