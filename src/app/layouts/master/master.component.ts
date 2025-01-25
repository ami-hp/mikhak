import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';

@Component({
  selector: 'master-layout',
  templateUrl: './master.component.html',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  styleUrl: './master.component.scss'
})
export class MasterComponent implements OnInit {
  ngOnInit(): void {
  }
}
