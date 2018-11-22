import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

export type ScreenSize = 'mobile' | 'tablet' | 'desktop';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private currentScreenSize: ScreenSize = 'mobile';
  private screenSize: Subject<ScreenSize> = new BehaviorSubject<ScreenSize>(this.currentScreenSize);
  screenSize$ = this.screenSize.asObservable();

  constructor(public breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web])
      .subscribe((state: BreakpointState) => {
        let currentSize: ScreenSize;
        switch (true) {
          case state.breakpoints['(max-width: 599px) and (orientation: portrait)']:
          case state.breakpoints['(max-width: 959px) and (orientation: landscape)']:
            currentSize = 'mobile';
            break;
          case state.breakpoints['(min-width: 600px) and (max-width: 839px) and (orientation: portrait)']:
          case state.breakpoints['(min-width: 840px) and (orientation: portrait)']:
            currentSize = 'tablet';
            break;
          case state.breakpoints['(min-width: 960px) and (max-width: 1279px) and (orientation: landscape)']:
          case state.breakpoints['(min-width: 1280px) and (orientation: landscape)']:
            currentSize = 'desktop';
            break;
          default:
            currentSize = 'mobile';
            break;
        }
        this.screenSize.next(currentSize);
      });
  }
}
