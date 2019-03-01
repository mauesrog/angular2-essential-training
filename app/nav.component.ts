import { Component, Inject } from '@angular/core';

import { NavigationData, navigationDataToken } from './providers';
import RoutingService from './routing.service';


interface NavComponentProps {
  activeRoute?: string,
}

@Component({
  selector: 'ps-nav',
  templateUrl: 'app/nav.component.html',
  styleUrls: ['app/nav.component.css'],
})
class NavComponent {
  private activeRoute: string;

  constructor(
    private routing: RoutingService,
    @Inject(navigationDataToken) private navigationData: NavigationData,
  ) {
    this.routing.activeRoute
    .subscribe(activeRoute => { this.ngComponentWillReceiveProps({ activeRoute }); });
  }

  ngComponentWillReceiveProps(props: NavComponentProps) {
    const prevProps = this.computeProps();

    if (props.activeRoute) { this.activeRoute = props.activeRoute; }

    this.ngComponentDidUpdate(prevProps);
  }

  ngComponentDidUpdate(prevProps: NavComponentProps) {}

  computeProps(): NavComponentProps {
    const { activeRoute } = this;

    return { activeRoute };
  }
}

export default NavComponent;
