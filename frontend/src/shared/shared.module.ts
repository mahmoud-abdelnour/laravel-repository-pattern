import { NgModule } from '@angular/core';
import { ThemeModule } from './theme.module';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { TableComponent } from './components/table/table.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { FileInputComponent } from './components/file-input/file-input.component';
import { ValidateOnblurDirective } from './directives/validate-onblur.directive';
import { MatChipsModule } from '@angular/material/chips';
import { TableStatusComponent } from './components/table/table-status/table-status.component';
import { AbilityDirective } from './directives/ability.directive';
import { PermissionsDirective } from './directives/permissions.directive';
import { DynamicCellComponent } from './components/table/dynamic-cell/dynamic-cell.component';

@NgModule({
  declarations: [
    TableComponent,
    DeleteDialogComponent,
    FileInputComponent,
    ValidateOnblurDirective,
    TableStatusComponent,
    AbilityDirective,
    PermissionsDirective,
    DynamicCellComponent
  ],
  imports: [
    ThemeModule,
    Angular2SmartTableModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    NgxValidateCoreModule,
    MatChipsModule
  ],
  exports:[
    TableComponent,
    DeleteDialogComponent,
    FileInputComponent,
    TableStatusComponent,

    AbilityDirective,
    PermissionsDirective,
    ValidateOnblurDirective,
    ThemeModule,
    TranslateModule,
    NgxValidateCoreModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    NgxPaginationModule
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'ar-EG' }
  ]
})
export class SharedModule { }
