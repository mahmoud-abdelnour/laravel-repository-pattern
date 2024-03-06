import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PermissionsType } from 'src/shared/enums/permissions-types';
import { ApiService } from 'src/shared/services/api.service';
import { Endpoints } from 'src/shared/services/endpoints';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
  host: { class:'app-dialog' }
})
export class PermissionsComponent implements OnInit, OnDestroy {
  @Input('data') data;
  @Input('ref') ref;
  @Input('type') type;

  form:FormGroup;

  constructor(
    private apiService:ApiService
  ) { }


  ngOnInit(): void {

    this.form = new FormGroup({
      roles:new FormControl(null),
      permissions:new FormArray([]),
    });

    this.getRoles();

    
  }

  subscriptions:Subscription[] = [];

  rolesObj = {};
  getRoles() {
    if(this.type == PermissionsType.user) {
      this.data.roles.map(r => this.rolesObj[r.name] = true);
      console.log(this.rolesObj);
    }

    this.apiService.get(Endpoints.provider.PermissionByKey, {type:this.type, id:this.data.id}).subscribe(roles => {
      roles.map(g => {
        let parentGroup = new FormGroup({
          category: new FormControl(g.category),
          id: new FormControl(g.id),
          name: new FormControl(g.name),
          title_ar: new FormControl(g.title_ar),
          title_en: new FormControl(g.title_en),
          permissions: new FormArray([]),
          isGranted: new FormControl(g.isGranted),
          indeterminate: new FormControl(null)
        });


        
        if(g.permissions) {
          let parentView = this.createPermissionGroup(g);
          (parentGroup.controls.permissions as FormArray).push(parentView);
          if(this.type == PermissionsType.user) for(let role of g.roles) {
            if(this.rolesObj[role]) {
              parentView.controls.isGranted.setValue(true);
              //parentView.controls.isGranted.disable();
              break;
            }
          }
          this.subscriptions.push(
            parentView.controls.isGranted.valueChanges.subscribe(change => {
              if(!change) this.changeAll(parentGroup, {checked:false})
              this.checkVal(parentGroup, parentGroup.controls.permissions );
            })
          );
        }

        
        (g.permissions || []).map(p => {
          let permission = this.createPermissionGroup(p);

          (parentGroup.controls.permissions as FormArray).push(permission);
          this.subscriptions.push(
            permission.controls.isGranted.valueChanges.subscribe(change => {
              if(change) parentGroup.controls.permissions.controls[0]['controls'].isGranted.setValue(true);
              this.checkVal(parentGroup,parentGroup.controls.permissions );
            })
          );

          if(this.type == PermissionsType.user) for(let role of p.roles) {
            if(this.rolesObj[role]) {
              permission.controls.isGranted.setValue(true);
              //permission.controls.isGranted.disable();
              break;
            }
          }
        });

        this.checkVal(parentGroup,parentGroup.controls.permissions );


        (this.form.controls['permissions'] as FormArray).push(parentGroup);
        
        if(this.type == PermissionsType.user) setTimeout(() => {
          for(let role of g.roles) {
            console.log(role, this.rolesObj[role])
            if(this.rolesObj[role]) {
              parentGroup.controls.isGranted.setValue(true);
              parentGroup.controls.isGranted.disable();
              break;
            }
          }
        })

      });

    })
  }

  checkVal(parent, permis) {
    setTimeout(() => {
      let isGranted = true;
      let isIndeterminate;
      let permissions = permis.getRawValue()  || [];

      for(let val of permissions) {
        if(!val.isGranted) isGranted = false;
        else {
          isIndeterminate = true;
        }
      }
      if(permissions.length == 0) {
        isGranted = parent.controls.isGranted.value;
      }

      // let includesFalse = permissions.value.includes(false);
      // let includesTrue = permissions.value.includes(true);

      parent.controls.isGranted.setValue(isGranted, {emitEvent:false});
      parent.controls.indeterminate.setValue(isIndeterminate && !isGranted, {emitEvent:false} );
    })
  }

  changeAll(group, ev) {
    for(let control of group.controls.permissions.controls) control.controls.isGranted.setValue(ev.checked, {emitEvent:false})
  }

  createPermissionGroup(data) {
    return new FormGroup({
      id: new FormControl(data.id),
      parent_id: new FormControl(data.parent_id),
      name: new FormControl(data.name),
      title_ar: new FormControl(data.title_ar),
      title_en: new FormControl(data.title_en),
      isGranted: new FormControl(data.isGranted),
    });
  }

  save() {
    let val = this.form.getRawValue();
    let permissions = [];
    for(let group of val.permissions) {
      if(group.isGranted || group.indeterminate) for(let permission of  group.permissions) {
        if(permission.isGranted) permissions.push(permission.name)
      }
    }

    this.ref.close(permissions)
  }

  ngOnDestroy(): void {
    for(let sub of this.subscriptions) sub.unsubscribe();
  }

}
