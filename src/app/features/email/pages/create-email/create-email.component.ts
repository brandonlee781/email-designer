import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';

import {
  AddComponent,
  CustomComponent,
  EmailState,
  SelectComponent,
  StandardComponent
} from '../../store';
import { BreakpointService, ScreenSize } from 'src/app/features/ui/services/breakpoint.service';
import { UiState } from 'src/app/features/ui/store/ui.state';
import { SetNavDrawer } from 'src/app/features/ui/store';


@Component({
  selector: 'ed-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.scss'],
})
export class CreateEmailComponent implements OnInit, OnDestroy {
  @Select(EmailState.getStandardComponents) standardComponents$: Observable<StandardComponent>;
  @Select(EmailState.getCurrentComponents) currentComponents$: Observable<CustomComponent>;
  @Select(EmailState.getSelectedComponent) selectedComponent$: Observable<CustomComponent>;
  @Select(UiState.getNavDrawerOpen) navDrawerOpen$: Observable<boolean>;

  breakpointSubscription: Subscription;
  selectedComponentSubscription: Subscription;

  rightNavOpen = false;
  selectedId: string;
  screenSize: ScreenSize;

  constructor(private store: Store, private breakpointService: BreakpointService) {
    this.selectedComponentSubscription = this.selectedComponent$
      .subscribe(comp => {
        this.rightNavOpen = comp.id ? true : false;
        this.selectedId = comp.id;
      });
    this.breakpointSubscription = this.breakpointService
      .screenSize$
      .subscribe(size => {
        this.screenSize = size;
      });
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<StandardComponent[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const customComponent: CustomComponent = Object.assign(
        {},
        event.previousContainer.data[event.previousIndex],
        {
          paddingTop: 20,
          paddingBottom: 0,
          text: null,
          marginBottom: true,
          titleAlignment: 'center',
          textAlignment: 'center',
          titleCase: 'uppercase'
        }
      );
      this.store.dispatch(new AddComponent(customComponent));
    }
  }

  onCardClick(id) {
    if (this.selectedId) {
      if (this.selectedId !== id) {
        this.store.dispatch(new SelectComponent(id));
      } else {
        this.store.dispatch(new SelectComponent());
      }
    } else {
      this.store.dispatch(new SelectComponent(id));
    }
  }

  onNavDrawerChange(e) {
    this.store.dispatch(new SetNavDrawer(e));
  }

  ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
    this.selectedComponentSubscription.unsubscribe();
  }
}
