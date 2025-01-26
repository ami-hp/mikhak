import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  protected scrollImg : string = "./images/static/scrool-down.svg";
  protected notifImg : string = "./images/static/shape-notif.webp";
  protected landingLogoImg : string = "./images/static/mikhak-landing-logo.png";


  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
