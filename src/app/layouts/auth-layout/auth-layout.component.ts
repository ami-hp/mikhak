import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgStyle} from '@angular/common';
import {CaptchaService} from '../../services/captcha.service';
import {DbService} from '../../services/db.service';

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
    const backgrounds: string[] = ['/images/static/Slider-1.jpg', '/images/static/Slider-2.jpg', '/images/static/Slider-3.jpg', '/images/static/Slider-4.jpg',];
    const randomIndex: number = Math.floor(Math.random() * backgrounds.length);
    this.backgroundUrl = `url('${backgrounds[randomIndex]}')`;
    this.cdr.detectChanges();
  }

}
