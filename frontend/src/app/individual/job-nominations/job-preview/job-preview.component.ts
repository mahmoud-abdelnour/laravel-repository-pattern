import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';
import { ThemeService } from 'src/shared/services/theme.service';

@Component({
  selector: 'app-job-preview',
  templateUrl: './job-preview.component.html',
  styleUrls: ['./job-preview.component.scss'],
  host: { class:'app-dialog' }
})
export class JobPreviewComponent {
  @Input('data') data;
  @Input('ref') ref;

  constructor(
    private apiService:ApiService,
    public themeService:ThemeService
  ) { }

  isSaving = false;
  takeAction(response) {
    this.isSaving = true;
    this.apiService.post(Endpoints.employee.accept_nomination, { nomination_id:this.data.pivot.id, response })
    .pipe(
      finalize(() => this.isSaving = false)
    )
    .subscribe( r => {
      this.ref.close(true)
    })
  }
}
