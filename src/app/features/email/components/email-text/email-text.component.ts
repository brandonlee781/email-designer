import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ed-email-text',
  templateUrl: './email-text.component.html',
  styleUrls: ['./email-text.component.scss']
})
export class EmailTextComponent implements OnInit {
  @Input() title: string;
  @Input() titleAlignment: string;
  @Input() titleCase: string;
  @Input() subtitle: string;
  @Input() text: string;
  @Input() textAlignment: string;
  @Input() paddingTop: 20;

  constructor() { }

  ngOnInit() {
  }

}
