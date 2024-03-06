import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation
} from "@angular/core";
import { ValidationErrorComponent } from "@ngx-validate/core";

@Component({
  selector:'app-error',
  template: `
    <span class="invalid-feedback font-weight-bold" *ngFor="let error of errors; trackBy: trackByFn">
      <!-- <mat-icon>
        error
      </mat-icon> -->
      {{ error.message  | translate:error.params}}
    </span>
  `,
  styles:[`
    .invalid-feedback{
      font-size: 13px;
      font-weight: bold;
      /* color: var(--icon-color); */
      color:#DD3333;
      padding: 0 20px;

      display: inline-block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ErrorComponent extends ValidationErrorComponent {

}
