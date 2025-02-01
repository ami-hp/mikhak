import {ElementRef, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private activeTab?: string;
  private renderer: Renderer2;
  private clickSubject: Subject<Event> = new Subject<Event>();
  private eventListener: string = 'click';
  private tabSelectorAttribute: string = 'data-tab';
  subscriptions: Subscription[] = [];

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  get clickObservable(): Observable<Event> {
    return this.clickSubject.asObservable();
  }

  get current(): string | null {
    return this.activeTab ? this.activeTab : null;
  }

  listenTo(eventName: string = 'click'): this {
    this.eventListener = eventName;
    return this;
  }

  attribute(value: string = 'data-tab') {
    this.tabSelectorAttribute = value;
    return this;
  }

  addListener(element: HTMLElement): void {
    this.renderer.listen(element, this.eventListener, (event: Event): void => {
      this.clickSubject.next(event);
    });
  }

  subscribe(elRef: ElementRef): void {
    const elements = elRef.nativeElement.querySelectorAll(`[${this.tabSelectorAttribute}]`);
    elements.forEach((element: HTMLElement) => {
      this.addListener(element);
    });

    //todo specify separate event
    this.subscriptions.push(
      this.clickObservable.subscribe({
        next: (event: Event): void => {
          this.handleTabClick(event);
        }
      })
    );
  }

  unsubscribe(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private handleTabClick(event: Event): void {
    const target = event.target as HTMLElement;
    const tabValue: string | null = target.getAttribute(this.tabSelectorAttribute);
    if (tabValue) {
      this.setActiveTab(tabValue);
    }
  }

  isOpen(tabName: string): boolean {
    return this.activeTab === tabName;
  }

  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }
}
