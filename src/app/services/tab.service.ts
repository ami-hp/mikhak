import {ElementRef, Injectable, OnDestroy, Renderer2, RendererFactory2} from '@angular/core';
import {Observable, Subject, takeUntil} from 'rxjs';
import {deprecate} from 'node:util';

@Injectable({
  providedIn: 'root'
})
export class TabService implements OnDestroy {
  private activeTabs: Map<string, string> = new Map
  private renderer: Renderer2;
  private clickSubject: Subject<{ event: Event, groupId: string}> = new Subject();
  private eventListener: string = 'click';
  private destroy$ = new Subject<void>();
  private elementRef!: ElementRef ;

  /**
   * @deprecated
   * @private
   */
  private tabSelectorAttribute: string = 'data-tab';
  /**
   * @deprecated
   */
  public groupName: string = 'group1';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit the signal to complete all observables
    this.destroy$.complete();
  }

  get clickObservable(): Observable<{ event: Event, groupId: string}> {
    return this.clickSubject.asObservable();
  }

  current(groupId : string): string | null {
    return this.activeTabs.get(groupId) || null;
  }

  element(elm : ElementRef) : this {
    this.elementRef = elm as ElementRef;
    return this;
  }

  listenTo(eventName: string = 'click'): this {
    this.eventListener = eventName;
    return this;
  }

  /**
   * @deprecated
   * @param attribute
   */
  attribute(attribute: string = 'data-tab') {
    this.tabSelectorAttribute = attribute;
    return this;
  }

  /**
   * @deprecated
   * @param name
   */
  group(name: string = 'group1') {
    this.groupName = name;
    return this;
  }

  private addListener(element: HTMLElement , groupId : string): void {
    this.renderer.listen(element, this.eventListener, (event: Event): void => {
      this.clickSubject.next({event , groupId});
    });
  }

  private getElements(attr : string) {
    return this.elementRef.nativeElement.querySelectorAll(`[${attr}]`);
  }

  subscribe(groupId : string = 'group1' , attr : string = 'data-tab') : this {
    const elements = this.getElements(attr)
    elements.forEach((element: HTMLElement) => this.addListener(element , groupId));

    this.clickObservable
      .pipe(takeUntil(this.destroy$)) // Unsubscribe when destroy$ emits
      .subscribe({
        next: ({event , groupId}): void => {
          this.handleExecuteEvent(event , groupId , attr);
        }
      });
    return this;
  }

  isOpen(tabName: string , groupId : string): boolean {
    return this.current(groupId) === tabName;
  }

  setActiveTab(tabName: string , groupId : string): this {
    this.activeTabs.set(groupId, tabName);
    return this;
  }

  private handleExecuteEvent(event: Event , groupId : string , attr : string): void {
    const target = event.target as HTMLElement;
    const tabValue: string | null = target.getAttribute(attr);
    if (tabValue) {
      this.setActiveTab(tabValue , groupId);
    }
  }
}
