import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports:[
    CommonModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class ThemeModule { }
