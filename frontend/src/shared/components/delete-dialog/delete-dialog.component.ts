import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {
  header = 'DialogRemoveMessage';
  body = 'TableDeleteMessage';
  confirmBtn = 'Delete';

  parent;

  constructor(
    private translateService:TranslateService,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.parent = this.data?.parent;
    
  }

}
