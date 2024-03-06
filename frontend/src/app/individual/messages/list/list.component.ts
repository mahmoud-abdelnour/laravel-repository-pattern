import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormMode } from 'src/shared/enums/form-mode';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('dialog') dialog;

  settings = {
    columns: {
      username:{
        title: 'عنوان الرسالة',
        type: 'string',
        filter: true,
      },
      permissions:{
        title: 'المرسل',
        type: 'string',
      },
      date:{
        title: 'تاريخ الإرسال',
        type: 'string',
      },
      actions: {
        title: 'الخيارات',
        type: 'string',
        classContent:'options-cell',
        classHeader:'options-cell',
        sort: false,
        filter: false,
      }
    },
  };
  
  constructor(
    private matDialog:MatDialog
  ) { }

  ngOnInit(): void {
  }

  

  openDialog(data = null, mode = FormMode.Create) {
    const dialogRef = this.matDialog.open(this.dialog, {
      data:{
        data,
        mode
      }
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
