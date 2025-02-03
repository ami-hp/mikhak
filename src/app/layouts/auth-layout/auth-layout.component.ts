import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  imports: [
    RouterOutlet,
    NgStyle
  ],
  templateUrl: './auth-layout.component.html',
  standalone: true,
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent implements OnInit{

  constructor(
    private cdr: ChangeDetectorRef,
  ) {
  }

  backgroundUrl: string = '';

  ngOnInit(): void {
    this.setBackgroundImage();
  }

  private setBackgroundImage(): void {
    const backgrounds: string[] = ['Slider-1.jpg', 'Slider-2.jpg', 'Slider-3.jpg', 'Slider-4.jpg',];
    const randomIndex: number = Math.floor(Math.random() * backgrounds.length);
    this.backgroundUrl = `url('assets/images/static/${backgrounds[randomIndex]}')`;
    this.cdr.detectChanges();
  }
}
