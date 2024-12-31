import {Injectable, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  generateCaptcha(): string {
    const characters : string = '0123456789';
    let captcha : string  = '';
    for (let i : number = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captcha += characters[randomIndex];
    }
    return captcha;
  }

  private getRandomHexColor(): string {
    const randomColor : string = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor.padStart(6, '0')}`;
  }

  generateCaptchaImage(captchaText: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = 150;
      canvas.height = 40;
      const ctx : CanvasRenderingContext2D | null = canvas.getContext('2d');

      if (ctx) {
        ctx.fillStyle = '#f0f0f0'; // #dadada
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial';
        ctx.fillStyle = `${this.getRandomHexColor()}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const angle: number = Math.random() * 0.4 - 0.2;
        const scaleX: number = Math.random() * 0.5 + 0.75;
        const scaleY: number = Math.random() * 0.5 + 0.75;
        ctx.setTransform(scaleX, Math.sin(angle), Math.sin(angle), scaleY, canvas.width / 2, canvas.height / 2);
        ctx.fillText(captchaText, 0, 0);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        for (let i: number = 0; i < 50; i++) {
          const x: number = Math.random() * canvas.width;
          const y: number = Math.random() * canvas.height;
          ctx.fillRect(x, y, 2, 2);
        }
      }
      return canvas.toDataURL('image/png');
    } else {
      return null;
    }
  }
}
