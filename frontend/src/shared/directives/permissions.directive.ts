import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionsGuard } from '../guards/permissions.guard';

@Directive({
  selector: '[appPerm]'
})
export class PermissionsDirective {

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private permissionsGuard:PermissionsGuard
  ) { }
  
  @Input() set appPerm(condition: string) {
    if (!condition || this.permissionsGuard.check(condition)) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainer.clear();
    }
  }
}
