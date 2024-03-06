import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbilitiesGuard } from '../guards/abilities.guard';

@Directive({
  selector: '[ability]'
})
export class AbilityDirective {

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
    private abilitiesGuard:AbilitiesGuard
  ) { }
  
  @Input() set ability(condition: boolean) {
    if (!condition || this.abilitiesGuard.check(condition)) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    } else {
      this._viewContainer.clear();
    }
  }
}
