import { Component, OnInit, Input } from '@angular/core';
import { LocationQuery, Location } from 'src/app/features/location/state';

@Component({
  selector: 'ed-email-footer-card',
  templateUrl: './email-footer-card.component.html',
  styleUrls: ['./email-footer-card.component.scss']
})
export class EmailFooterCardComponent implements OnInit {
  @Input() location: Location;

  constructor() { }

  ngOnInit() {}

}
