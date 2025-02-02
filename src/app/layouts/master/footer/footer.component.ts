import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected mapImg : string = './images/static/map.webp';
  protected marginWhiteImg: string = "./images/static/margin_white.svg";
}
