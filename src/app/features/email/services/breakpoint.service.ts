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

        if (
          state.breakpoints['(max-width: 599.99px) and (orientation: portrait)'] ||
          state.breakpoints['(max-width: 959.99px) and (orientation: landscape)']
        ) {
          currentSize = 'mobile';
        } else if (
          state.breakpoints['(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)'] ||
          state.breakpoints['(min-width: 840px) and (orientation: portrait)']
        ) {
          currentSize = 'tablet';
        } else if (
          state.breakpoints['(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)'] ||
          state.breakpoints['(min-width: 1280px) and (orientation: landscape)']
        ) {
          currentSize = 'desktop';
        }

        this.screenSize.next(currentSize);
      });
  }
}
