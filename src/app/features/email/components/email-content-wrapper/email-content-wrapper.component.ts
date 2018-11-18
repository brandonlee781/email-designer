import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ed-email-content-wrapper',
  templateUrl: './email-content-wrapper.component.html',
  styleUrls: ['./email-content-wrapper.component.scss']
})
export class EmailContentWrapperComponent implements OnInit {
  @Input() collapse: boolean;
  @Input() fullWidth: boolean;
  tableClass: string;
  rowClass: string;

  constructor() {
    this.tableClass = this.collapse ? 'row collapse' : 'row';
    this.rowClass = this.fullWidth
      ? 'full-width small-12 large-12 columns first last'
      : 'small-12 large-12 columns first last';
  }

  ngOnInit() {
  }

}
