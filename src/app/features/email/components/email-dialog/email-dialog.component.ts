import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogType } from '../../state/email';
import { GenerateHtmlService } from '../../services/generate-html.service';

export interface DialogData {
  type: DialogType;
}

@Component({
  selector: 'ed-email-dialog',
  templateUrl: './email-dialog.component.html',
  styleUrls: ['./email-dialog.component.scss']
})
export class EmailDialogComponent implements OnInit {
  header: string;
  content: string;
  html: string;
  text: string;
  copySuccess = false;
  copyError = false;

  constructor(
    public dialogRef: MatDialogRef<EmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private generateHtmlService: GenerateHtmlService,
  ) {
    this.generateHtmlService
      .html$
      .subscribe(({ html, text }) => {
        this.html = html;
        this.text = text;
      });
  }

  ngOnInit() {
    switch (this.data.type) {
      case 'generateHtml':
        this.header = 'Generated Email HTML';
        this.content = this.html;
        break;
      case 'generateText':
        this.header = 'Generated Email Text';
        this.content = this.text;
        break;
      default:
        this.header = 'What did you do?';
        break;
    }
  }
}
