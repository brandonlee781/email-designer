import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ID } from '@datorama/akita';
import { Observable, Subscription } from 'rxjs';
import { BreakpointService, ScreenSize } from 'src/app/features/email/services/breakpoint.service';
import { LocationQuery, LocationService } from 'src/app/features/location/state';

import { Email, EmailQuery, EmailService, EmailStore } from '../../state/email';
import { EmailCard, EmailCardQuery, EmailCardService } from '../../state/email-card';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EmailDialogComponent } from '../../components/email-dialog/email-dialog.component';


@Component({
  selector: 'ed-create-email',
  templateUrl: './create-email.component.html',
  styleUrls: ['./create-email.component.scss'],
})
export class CreateEmailComponent implements OnInit, OnDestroy {
  id: ID;
  email$: Observable<Email> = this.emailQuery.selectActive();
  currentComponents$: Observable<EmailCard[]>;
  selectedComponent$ = this.emailCardQuery.selectActive();
  selectedLocation$ = this.locationQuery.selectActive();
  navDrawerOpen$: Observable<Boolean> =  this.emailCardQuery.isNavDrawerOpen$;

  breakpointSubscription: Subscription;
  routerSubscription: Subscription;
  selectedComponentSubscription: Subscription;

  rightNavOpen = false;
  selectedId: string;
  screenSize: ScreenSize;

  constructor(
    private emailStore: EmailStore,
    private emailService: EmailService,
    private emailQuery: EmailQuery,
    private emailCardQuery: EmailCardQuery,
    private emailCardService: EmailCardService,
    private locationQuery: LocationQuery,
    private locationService: LocationService,
    private breakpointService: BreakpointService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.breakpointSubscription = this.breakpointService
      .screenSize$
      .subscribe(size => {
        this.screenSize = size;
      });
    this.emailQuery.select(store => store.ui)
      .subscribe(dialogData => {
        if (dialogData.dialogOpen) {
          const dialogRef = this.dialog.open(EmailDialogComponent, {
            width: '550px',
            panelClass: 'email-dialog',
            data: { type: dialogData.dialogType },
          });

          dialogRef.afterClosed().subscribe(result => {
            this.emailStore.updateEmailDialog(false, '');
          });
        }
      });
  }

  ngOnInit() {
    this.routerSubscription = this.route.params.subscribe(params => {
      this.id = params.id;
      this.emailService.selectEmail(this.id);
      this.currentComponents$ = this.emailCardQuery.selectEmailsCards(this.id);
      this.locationService.selectLocation(this.emailQuery.getActive().location.id);
    });
    this.locationService.get();
  }

  drop(event: CdkDragDrop<EmailCard[]>) {
    const payload = {
      id: event.container.data[event.previousIndex],
      previousIndex: event.previousIndex,
      nextIndex: event.currentIndex,
    };
    // this.emailService.moveCard(payload);
    // if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    // } else {
    //   const customComponent: CustomComponent = Object.assign(
    //     {},
    //     event.previousContainer.data[event.previousIndex],
    //     {
    //       paddingTop: 20,
    //       paddingBottom: 0,
    //       text: null,
    //       marginBottom: true,
    //       titleAlignment: 'center',
    //       textAlignment: 'center',
    //       titleCase: 'uppercase'
    //     }
    //   );
    //   this.store.dispatch(new AddComponent(customComponent));
    // }
  }

  onNavDrawerChange(e) {
    this.emailCardService.updateNavDrawer(e);
  }

  ngOnDestroy() {
    this.breakpointSubscription.unsubscribe();
    this.emailService.selectEmail(null);
    this.routerSubscription.unsubscribe();
  }
}
