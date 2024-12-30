import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  generateCaptcha(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters[randomIndex];
    }
    return captcha;
  }

  private getRandomHexColor() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  }

  generateCaptchaImage(captchaText: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const canvas = document.createElement('canvas');
      canvas.width = 150;
      canvas.height = 40;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#f0f0f0'; // #dadada
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '30px Arial';
        ctx.fillStyle = `${this.getRandomHexColor()}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(captchaText, canvas.width / 2, canvas.height / 2);

        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.fillRect(x, y, 2, 2);
        }
      }

      return canvas.toDataURL('image/png');
    } else {
      return null;
    }
  }
}
