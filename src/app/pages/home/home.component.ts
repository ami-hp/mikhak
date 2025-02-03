import {AfterContentInit, AfterViewInit, Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TabService} from '../../services/tab.service';
import {trigger, state, style, animate, transition} from '@angular/animations';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss',
  animations: [
    trigger('tabContent', [
      state('active', style({
        opacity: 1,
        zIndex: 0,
      })),
      state('inactive', style({
        opacity: 0,
        zIndex: -10,
      })),
      transition('inactive => active', [
        animate('300ms ease-in')
      ]),
      transition('active => inactive', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {

  protected scrollImg: string = "assets/images/static/scrool-down.svg";
  protected notifImg: string = "assets/images/static/shape-notif.webp";
  protected landingLogoImg: string = "assets/images/static/mikhak-landing-logo.png";
  protected marginBlueImg: string = "assets/images/static/margin_blue.svg";
  private fragmentSubscription?: Subscription;
  private currentFragment?: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected tabService: TabService,
    private elRef: ElementRef,
  ) {
  }

  ngOnInit(): void {
    this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
      this.currentFragment = fragment;
    });
    this.tabService.element(this.elRef);
  }

  ngAfterContentInit() {
    this.tabService.setActiveTab(this.currentFragment ?? 'introduction' , 'group1');
    this.tabService.subscribe('group1');
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
  }


  isHomeTabOpen(tabName: string): boolean {
    return this.tabService.isOpen(tabName , 'group1');
  }

  isHomeTabClosed(tabName: string): boolean {
    return !this.tabService.isOpen(tabName , 'group1');
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
