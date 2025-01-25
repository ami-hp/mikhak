import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'master-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  @ViewChild('mobileMenu') mobileMenuDom!: ElementRef;
  @ViewChild('mobileMenuBtn') mobileMenuBtnDom!: ElementRef;

  private clickListener?: (() => void) | null
  protected asideState: boolean = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  handleMobileMenuClick(): void {
    this.openMobileMenu();
  }

  openMobileMenu(): void {
    this.asideState = true;
    setTimeout(() => this.addEventListener() , 500)
  }

  closeMobileMenu(): void {
    this.asideState = false;
    setTimeout(() => this.removeEventListener() , 500)
  }

  isMenuOpen() : boolean {
    return this.asideState;
  }

  handleClickOutside(event: MouseEvent) {
    if (this.isMenuOpen() && !this.mobileMenuDom.nativeElement.contains(event.target as Node)) {
      this.closeMobileMenu();
    }
  }

  addEventListener() {
    if (!this.clickListener) {
      this.clickListener = this.renderer.listen('window', 'click', this.handleClickOutside.bind(this));
    }
  }

  removeEventListener() {
    if (this.clickListener) {
      this.clickListener();
      this.clickListener = null;
    }
  }
}
