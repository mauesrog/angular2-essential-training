import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import RoutingService from "./routing.service";

interface AboutComponentProps {
    activeRoute?: string,
    url?: string,
}


@Component({
    selector: 'ps-about',
    templateUrl: 'app/about.component.html',
    styleUrls: ['assets/stylesheets/section.css', 'app/about.component.css'],
})
class AboutComponent {
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

    ngComponentWillReceiveProps(props: AboutComponentProps) {
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

    ngComponentDidUpdate(prevProps: AboutComponentProps) {
        const { url: prevUrl } = prevProps;

        if (this.activeRoute !== this.url && this.url === 'about' &&
            prevUrl !== this.url) {
            this.routing.updateRoute(this.url);
        }
    }

    computeProps(): AboutComponentProps {
        const { activeRoute, url } = this;

        return { activeRoute, url };
    }
}

export default AboutComponent;