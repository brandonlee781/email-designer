import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ed-email-button',
  templateUrl: './email-button.component.html',
  styleUrls: ['./email-button.component.scss']
})
export class EmailButtonComponent implements OnInit {
  @Input() link?: string;
  @Input() text?: string;
  @Input() paddingBottom?: number;

  constructor() { }

  ngOnInit() {
  }

}
