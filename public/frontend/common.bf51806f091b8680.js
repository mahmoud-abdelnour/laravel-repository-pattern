"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[8592],{4387:(g,c,o)=>{o.d(c,{v:()=>M});var t=o(4006),l=o(5033),_=o(1511),e=o(4650),d=o(9242),r=o(6895),u=o(4859),f=o(5412),m=o(4115),b=o(7084),O=o(6709),E=o(3416);function P(h,v){if(1&h&&(e.TgZ(0,"mat-checkbox",10),e._uU(1),e.ALo(2,"translate"),e.qZA()),2&h){const n=v.$implicit,i=v.index;e.Q6J("formControl",n.controls.isGranted),e.xp6(1),e.AsE(" ",0==i?e.lcZ(2,3,"View"):""," ",n.controls.title_ar.value," ")}}function y(h,v){if(1&h){const n=e.EpF();e.TgZ(0,"mat-accordion")(1,"mat-expansion-panel",7)(2,"mat-expansion-panel-header")(3,"mat-panel-title")(4,"div")(5,"mat-checkbox",8),e.NdJ("click",function(s){return s.stopPropagation()})("change",function(s){const p=e.CHM(n).$implicit,C=e.oxw();return e.KtG(C.changeAll(p,s))}),e._uU(6),e.qZA()()()(),e.TgZ(7,"section"),e.YNc(8,P,3,5,"mat-checkbox",9),e.qZA()()()}if(2&h){const n=v.$implicit;e.xp6(5),e.Q6J("indeterminate",n.controls.indeterminate.value)("formControl",n.controls.isGranted),e.xp6(1),e.hij(" ",n.controls.title_ar.value," "),e.xp6(2),e.Q6J("ngForOf",n.controls.permissions.controls)}}let M=(()=>{class h{constructor(n){this.apiService=n,this.subscriptions=[],this.rolesObj={}}ngOnInit(){this.form=new t.cw({roles:new t.NI(null),permissions:new t.Oe([])}),this.getRoles()}getRoles(){this.type==l.Z.user&&(this.data.roles.map(n=>this.rolesObj[n.name]=!0),console.log(this.rolesObj)),this.apiService.get(_.A.provider.PermissionByKey,{type:this.type,id:this.data.id}).subscribe(n=>{n.map(i=>{let s=new t.cw({category:new t.NI(i.category),id:new t.NI(i.id),name:new t.NI(i.name),title_ar:new t.NI(i.title_ar),title_en:new t.NI(i.title_en),permissions:new t.Oe([]),isGranted:new t.NI(i.isGranted),indeterminate:new t.NI(null)});if(i.permissions){let a=this.createPermissionGroup(i);if(s.controls.permissions.push(a),this.type==l.Z.user)for(let p of i.roles)if(this.rolesObj[p]){a.controls.isGranted.setValue(!0);break}this.subscriptions.push(a.controls.isGranted.valueChanges.subscribe(p=>{p||this.changeAll(s,{checked:!1}),this.checkVal(s,s.controls.permissions)}))}(i.permissions||[]).map(a=>{let p=this.createPermissionGroup(a);if(s.controls.permissions.push(p),this.subscriptions.push(p.controls.isGranted.valueChanges.subscribe(C=>{C&&s.controls.permissions.controls[0].controls.isGranted.setValue(!0),this.checkVal(s,s.controls.permissions)})),this.type==l.Z.user)for(let C of a.roles)if(this.rolesObj[C]){p.controls.isGranted.setValue(!0);break}}),this.checkVal(s,s.controls.permissions),this.form.controls.permissions.push(s),this.type==l.Z.user&&setTimeout(()=>{for(let a of i.roles)if(console.log(a,this.rolesObj[a]),this.rolesObj[a]){s.controls.isGranted.setValue(!0),s.controls.isGranted.disable();break}})})})}checkVal(n,i){setTimeout(()=>{let a,s=!0,p=i.getRawValue()||[];for(let C of p)C.isGranted?a=!0:s=!1;0==p.length&&(s=n.controls.isGranted.value),n.controls.isGranted.setValue(s,{emitEvent:!1}),n.controls.indeterminate.setValue(a&&!s,{emitEvent:!1})})}changeAll(n,i){for(let s of n.controls.permissions.controls)s.controls.isGranted.setValue(i.checked,{emitEvent:!1})}createPermissionGroup(n){return new t.cw({id:new t.NI(n.id),parent_id:new t.NI(n.parent_id),name:new t.NI(n.name),title_ar:new t.NI(n.title_ar),title_en:new t.NI(n.title_en),isGranted:new t.NI(n.isGranted)})}save(){let n=this.form.getRawValue(),i=[];for(let s of n.permissions)if(s.isGranted||s.indeterminate)for(let a of s.permissions)a.isGranted&&i.push(a.name);this.ref.close(i)}ngOnDestroy(){for(let n of this.subscriptions)n.unsubscribe()}}return h.\u0275fac=function(n){return new(n||h)(e.Y36(d.s))},h.\u0275cmp=e.Xpm({type:h,selectors:[["app-permissions"]],hostAttrs:[1,"app-dialog"],inputs:{data:"data",ref:"ref",type:"type"},decls:14,vars:14,consts:[[3,"formGroup","ngSubmit"],["mat-dialog-title",""],[1,"mat-typography"],[4,"ngFor","ngForOf"],["align","end",1,"actions"],["type","button","mat-button","","mat-dialog-close","",1,"cancel"],["mat-button","","cdkFocusInitial","",1,"save"],["expanded","true",1,"mb-4"],["color","primary",3,"indeterminate","formControl","click","change"],["color","primary","class","d-block",3,"formControl",4,"ngFor","ngForOf"],["color","primary",1,"d-block",3,"formControl"]],template:function(n,i){1&n&&(e.TgZ(0,"form",0),e.NdJ("ngSubmit",function(){return i.save()}),e.TgZ(1,"h2",1),e._uU(2),e.ALo(3,"translate"),e.ALo(4,"translate"),e.qZA(),e.TgZ(5,"mat-dialog-content",2),e.YNc(6,y,9,4,"mat-accordion",3),e.qZA(),e.TgZ(7,"mat-dialog-actions",4)(8,"button",5),e._uU(9),e.ALo(10,"translate"),e.qZA(),e.TgZ(11,"button",6),e._uU(12),e.ALo(13,"translate"),e.qZA()()()),2&n&&(e.Q6J("formGroup",i.form),e.xp6(2),e.AsE(" ",e.lcZ(3,6,"Update")," ",e.lcZ(4,8,"Permissions")," "),e.xp6(4),e.Q6J("ngForOf",i.form.controls.permissions.controls),e.xp6(3),e.hij(" ",e.lcZ(10,10,"Cancel")," "),e.xp6(3),e.hij(" ",e.lcZ(13,12,"Save")," "))},dependencies:[r.sg,u.lW,t._Y,t.JJ,t.JL,t.oH,t.sg,f.ZT,f.uh,f.xY,f.H8,m.hL,m.J5,b.pp,b.ib,b.yz,b.yK,O.oG,E.X$],styles:["[_nghost-%COMP%]{min-width:70vw;display:block}[_nghost-%COMP%]   mat-dialog-content[_ngcontent-%COMP%]{background-color:var(--light-blue);padding-top:16px}[_nghost-%COMP%]   mat-dialog-content[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]{line-height:35px}"]}),h})()},2759:(g,c,o)=>{o.d(c,{i:()=>_});var t=o(4650),l=o(4006);let _=(()=>{class e{constructor(r){this.formControl=r}onFocus(r){this.wasChanged=!1,this.validators=this.formControl.control.validator,this.asyncValidators=this.formControl.control.asyncValidator,this.formControl.control.clearAsyncValidators(),this.formControl.control.clearValidators(),this.formControl.control.setValidators(null),this.formControl.control.setErrors(null)}onKeyup(r){this.wasChanged=!0}onChange(r){this.wasChanged=!0}onNgModelChange(r){this.wasChanged=!0}onBlur(r){this.formControl.control.setAsyncValidators(this.asyncValidators),this.formControl.control.setValidators(this.validators),this.wasChanged&&this.formControl.control.updateValueAndValidity()}}return e.\u0275fac=function(r){return new(r||e)(t.Y36(l.a5))},e.\u0275dir=t.lG2({type:e,selectors:[["","validate-onblur",""]],hostBindings:function(r,u){1&r&&t.NdJ("focus",function(m){return u.onFocus(m)})("blur",function(m){return u.onBlur(m)})("keyup",function(m){return u.onKeyup(m)})("change",function(m){return u.onChange(m)})("ngModelChange",function(m){return u.onNgModelChange(m)})}}),e})()},5033:(g,c,o)=>{o.d(c,{Z:()=>t});var t=(()=>{return(l=t||(t={})).user="user",l.role="role",t;var l})()},7461:(g,c,o)=>{o.d(c,{F:()=>t});var t=(()=>{return(l=t||(t={})).employee="employee",l.company="company",l.provider="provider",t;var l})()},3988:(g,c,o)=>{function t(l){return"ar"==l?{title:"En",value:"en"}:{title:"\u0639",value:"ar"}}o.d(c,{H:()=>t})},1361:(g,c,o)=>{function l(){return d=>{const r=d.value;return r&&(r.toString().includes("-")||r.toString().includes(".")||r.toString().includes("/")||r.toString().includes("*")||r<1)?{notValidInteger:!0}:null}}function _(){return d=>{const r=d.value;if(!r)return null;let u=/^0+$/.test(r);return console.log(u),u?{NoZeros:!1}:null}}function e(){return d=>{let r=d.value;return r?(r=r.trim(),22!==r.length?{Iban:!1}:null):null}}o.d(c,{U6:()=>e,tt:()=>_,zi:()=>l})},8995:(g,c,o)=>{function t(){return l=>{const _=l.value;return null==_||_?null:{checkError:!0}}}o.d(c,{v:()=>t})},8077:(g,c,o)=>{function t(l,_){return e=>{e.controls[l].value!==e.controls[_].value&&e.controls[l].value&&e.controls[_].value&&e.controls[_].setErrors({matchError:!0})}}o.d(c,{f:()=>t})}}]);