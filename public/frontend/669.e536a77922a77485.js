"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[669],{669:(tt,v,a)=>{a.r(v),a.d(v,{EmployeesModule:()=>q});var c=a(6895),C=a(9197),l=a(1511),t=a(4650),g=a(9242),F=a(3546),f=a(3848),p=a(2252),y=a(8674),x=a(9134),_=a(4763),I=a(9485),h=a(2278),J=a(9807),E=a(7392),T=a(4859);function D(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",0),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.parent.takeAction("Admit",s.rowData))}),t.TgZ(1,"mat-icon",1),t._uU(2," verified "),t.qZA()()}}function M(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",0),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.parent.suggestCourses(s.rowData))}),t.TgZ(1,"mat-icon",1),t._uU(2," auto_stories "),t.qZA()()}}function j(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",0),t.NdJ("click",function(){t.CHM(e);const s=t.oxw(2);return t.KtG(s.parent.takeAction("Ban",s.rowData))}),t._UZ(1,"mat-icon",6),t.qZA()}}function Y(n,i){if(1&n&&(t.ynx(0),t.YNc(1,j,2,0,"button",2),t.BQk()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.rowData.status!==e.themeService.settings.EMPLOYEE_STATUS.enum.banned)}}function Q(n,i){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"button",0),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.parent.popDelete(s.rowData))}),t.TgZ(2,"mat-icon",7),t._uU(3," delete "),t.qZA()(),t.BQk()}}let N=(()=>{class n{constructor(e){this.themeService=e}ngOnInit(){}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(h.f))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-actions"]],hostAttrs:[1,"list-actions-btns"],decls:10,vars:4,consts:[["mat-button","",3,"click"],["color","primary"],["mat-button","",3,"click",4,"ngIf"],[1,"payments"],["mat-button","",3,"click",4,"appPerm"],[4,"appPerm"],["svgIcon","account_circle_off",1,"ban"],["color","warn"]],template:function(e,o){1&e&&(t.TgZ(0,"button",0),t.NdJ("click",function(){return o.parent.openEmployeeDialog(o.rowData)}),t.TgZ(1,"mat-icon",1),t._uU(2," visibility "),t.qZA()(),t.YNc(3,D,3,0,"button",2),t.TgZ(4,"button",0),t.NdJ("click",function(){return o.parent.openEmployeeDialog(o.rowData,2)}),t.TgZ(5,"mat-icon",3),t._uU(6," payments "),t.qZA()(),t.YNc(7,M,3,0,"button",4),t.YNc(8,Y,2,1,"ng-container",5),t.YNc(9,Q,4,0,"ng-container",5)),2&e&&(t.xp6(3),t.Q6J("ngIf",o.rowData.status!==o.themeService.settings.EMPLOYEE_STATUS.enum.active),t.xp6(4),t.Q6J("appPerm","suggest_course"),t.xp6(1),t.Q6J("appPerm","ban_employee"),t.xp6(1),t.Q6J("appPerm","delete_employee"))},dependencies:[c.O5,J.$,E.Hw,T.lW],styles:[".ban[_ngcontent-%COMP%]{color:#263238}.payments[_ngcontent-%COMP%]{color:#2e7d32}"]}),n})();var m=a(5412),b=a(3416),O=a(8038),r=a(4006),U=a(8746),A=a(8796),S=a(4115);const G=["select"];function P(n,i){if(1&n&&(t.TgZ(0,"ng-option",11),t._uU(1),t.qZA()),2&n){const e=i.$implicit;t.Q6J("value",e.id),t.xp6(1),t.hij(" ",e.course_title," ")}}function B(n,i){if(1&n&&(t.TgZ(0,"button",12),t._uU(1," \u062d\u0641\u0638 "),t.qZA()),2&n){const e=t.oxw();t.Q6J("disabled",e.isSaving)}}let w=(()=>{class n{constructor(e,o){this.apiService=e,this.themeService=o,this.isSaving=!1}ngOnInit(){this.form=new r.cw({course_id:new r.NI(null,r.kI.required)}),this.data&&this.form.patchValue(this.data)}OnSearch(e){this.selectComp.open(),this.getCourses(e.term)}getCourses(e){this.subscription&&this.subscription.unsubscribe(),this.subscription=this.apiService.get(l.A.provider.courses,{course_title:e,limit:!1}).subscribe(o=>{this.courses=o.data})}save(){console.log(this.form),!this.form.invalid&&this.apiService.put(l.A.provider.employees+"/"+this.data.id+"/suggestCourses",this.form.value).pipe((0,U.x)(()=>this.isSaving=!1)).subscribe(e=>{this.themeService.openSnackBar("SavedSuccessfully",null),this.ref.close(!0)})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(g.s),t.Y36(h.f))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-suggest-courses"]],viewQuery:function(e,o){if(1&e&&t.Gf(G,5),2&e){let s;t.iGM(s=t.CRH())&&(o.selectComp=s.first)}},inputs:{ref:"ref",data:"data"},decls:14,vars:6,consts:[[3,"formGroup","ngSubmit"],["mat-dialog-title",""],[1,"mat-typography"],[1,"row"],[1,"col-md-12","form-group","mb-4"],["formControlName","course_id",3,"search","blur"],["select",""],[3,"value",4,"ngFor","ngForOf"],["align","end",1,"actions"],["type","button","mat-button","","mat-dialog-close","",1,"cancel"],["mat-button","","cdkFocusInitial","","class","save",3,"disabled",4,"ngIf"],[3,"value"],["mat-button","","cdkFocusInitial","",1,"save",3,"disabled"]],template:function(e,o){if(1&e){const s=t.EpF();t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return o.save()}),t.TgZ(1,"h2",1),t._uU(2," \u062a\u0631\u0634\u064a\u062d \u062f\u0648\u0631\u0629 \u0644\u0644\u0645\u0648\u0638\u0641 "),t.qZA(),t.TgZ(3,"mat-dialog-content",2)(4,"div",3)(5,"div",4)(6,"ng-select",5,6),t.NdJ("search",function(d){return t.CHM(s),t.MAs(7).open(),t.KtG(o.OnSearch(d))})("blur",function(){return o.selectComp.close()}),t.YNc(8,P,2,2,"ng-option",7),t.qZA()()()(),t.TgZ(9,"mat-dialog-actions",8)(10,"button",9),t._uU(11),t.ALo(12,"translate"),t.qZA(),t.YNc(13,B,2,1,"button",10),t.qZA()()}2&e&&(t.Q6J("formGroup",o.form),t.xp6(8),t.Q6J("ngForOf",o.courses),t.xp6(3),t.hij(" ",t.lcZ(12,4,"Back")," "),t.xp6(2),t.Q6J("ngIf",!o.form.disabled))},dependencies:[c.sg,c.O5,T.lW,A.w9,A.jq,r._Y,r.JJ,r.JL,r.sg,r.u,m.ZT,m.uh,m.xY,m.H8,S.hL,S.J5,b.X$],styles:["mat-dialog-content[_ngcontent-%COMP%]{min-width:50vw;min-height:200px;overflow:visible}"]}),n})();const L=["dialog"],R=["table"];function H(n,i){if(1&n&&t._UZ(0,"app-table",3,4),2&n){const e=t.oxw();t.Q6J("paginationId",e.paginationId)("settings",e.settings)("apiFunc",e.apiFunc)}}function K(n,i){if(1&n&&t._UZ(0,"app-suggest-courses",5),2&n){const e=i.dialogRef;t.Q6J("data",i.$implicit.data)("ref",e)}}let X=(()=>{class n{constructor(e,o,s,u,d){this.matDialog=e,this.apiService=o,this.datePipe=s,this.translateService=u,this.themeService=d,this.FormMode=_.h,this.jobs={}}ngOnInit(){this.settings={columns:{name_ar:{title:"\u0627\u0644\u0645\u0648\u0638\u0641",type:p.Jm.Text,filter:!0,filterFunction:(e,o)=>!0,valuePrepareFunction:(e,o)=>o.name_ar},job_id:{title:"\u0627\u0644\u0648\u0638\u064a\u0641\u0629",type:p.Jm.Text,filter:!0,valuePrepareFunction:(e,o)=>this.jobs[e].job_title,filterFunction:(e,o)=>!0},approved_at:{title:"\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0625\u0646\u0636\u0645\u0627\u0645",filter:!1,type:p.Jm.Text,valuePrepareFunction:(e,o)=>this.datePipe.transform(e,"yyyy/MM/dd")},status:{title:"\u0627\u0644\u062d\u0627\u0644\u0629",type:p.Jm.Custom,filter:!1,renderComponent:x.p},actions:{title:this.translateService.instant("Options"),type:p.Jm.Custom,renderComponent:N,sort:!1,filter:!1,onComponentInitFunction:e=>e.parent=this}}}}openDialog(e=_.h.Create,o=null){this.matDialog.open(this.dialog,{data:{data:o,mode:e}}).afterClosed().subscribe(u=>{u&&this.updateTables()})}suggestCourses(e=null){this.matDialog.open(this.dialog,{data:{data:e}}).afterClosed().subscribe(s=>{s&&this.updateTables()})}popDelete(e){this.rowToDelete=e.id;let o=this.matDialog.open(y.F,{data:{parent:this}});o.componentInstance.header="DeleteEmployeeTitle",o.componentInstance.body="DeleteEmployeeMSG"}delete(){this.apiService.delete(l.A.provider.employees+"/"+this.rowToDelete).subscribe(e=>{this.themeService.openSnackBar("DeleteSuccessMSG",null),this.updateTables()})}takeAction(e,o){let s=this.matDialog.open(y.F);s.componentInstance.header=e+"EmployeeTitle",s.componentInstance.body=e+"EmployeeMSG",s.componentInstance.confirmBtn=e+"Btn",s.afterClosed().subscribe(u=>{u&&this.apiService.put("Ban"==e?l.A.provider.employees+"/"+o.id+"/ban":l.A.provider.employees+"/"+o.id+"/admit").subscribe(d=>{this.themeService.openSnackBar(e+"SuccessMSG",null),this.updateTables()})})}updateTables(){this.table.reloadTable();for(let e of this.lists)e.table.reloadTable()}openEmployeeDialog(e,o=0){const s=this.matDialog.open(I.o,{width:"90vw"});s.componentInstance.data=e,s.componentInstance.selectedIndex=o,s.componentInstance.title="EmployeeDetails"}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(m.uw),t.Y36(g.s),t.Y36(c.uU),t.Y36(b.sK),t.Y36(h.f))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-list"]],viewQuery:function(e,o){if(1&e&&(t.Gf(L,5),t.Gf(R,5)),2&e){let s;t.iGM(s=t.CRH())&&(o.dialog=s.first),t.iGM(s=t.CRH())&&(o.table=s.first)}},inputs:{lists:"lists",jobs:"jobs",apiFunc:"apiFunc",paginationId:"paginationId"},features:[t._Bn([c.uU])],decls:4,vars:1,consts:[[1,"mt-5","mb-5"],[3,"paginationId","settings","apiFunc",4,"ngIf"],["dialog",""],[3,"paginationId","settings","apiFunc"],["table",""],[3,"data","ref"]],template:function(e,o){1&e&&(t.TgZ(0,"div",0),t.YNc(1,H,2,3,"app-table",1),t.qZA(),t.YNc(2,K,1,2,"ng-template",null,2,t.W1O)),2&e&&(t.xp6(1),t.Q6J("ngIf",o.settings))},dependencies:[c.O5,O.a,w]}),n})();const Z=function(n){return[n]};function k(n,i){if(1&n&&(t.TgZ(0,"mat-card")(1,"mat-tab-group",2)(2,"mat-tab",3),t._UZ(3,"app-list",4,5),t.qZA(),t.TgZ(5,"mat-tab",6),t._UZ(6,"app-list",7,8),t.qZA()()()),2&n){const e=t.MAs(4),o=t.MAs(7),s=t.oxw();t.xp6(3),t.Q6J("apiFunc",s.activeApiFunc)("lists",t.VKq(6,Z,o))("jobs",s.jobs),t.xp6(3),t.Q6J("apiFunc",s.banApiFunc)("lists",t.VKq(8,Z,e))("jobs",s.jobs)}}const $=[{path:"list",component:(()=>{class n{constructor(e){this.apiService=e,this.activeApiFunc=(o={})=>this.apiService.get(l.A.provider.employees,o),this.banApiFunc=(o={})=>this.apiService.get(l.A.provider.banned_employees,o),this.jobs={},this.allDone=!1}ngOnInit(){this.apiService.get(l.A.provider.jobs,{limit:!1}).subscribe(e=>{for(let o of e.data)this.jobs[o.id]=o,this.allDone=!0})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(g.s))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-employees"]],decls:5,vars:4,consts:[[1,"card-cont"],[4,"ngIf"],["mat-align-tabs","center"],["label","\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646"],["paginationId","list1",3,"apiFunc","lists","jobs"],["list1",""],["label","\u0627\u0644\u0645\u0648\u0638\u0641\u0648\u0646 \u0627\u0644\u0645\u062d\u0638\u0648\u0631\u0648\u0646"],["paginationId","list3",3,"apiFunc","lists","jobs"],["list2",""]],template:function(e,o){1&e&&(t.TgZ(0,"section",0)(1,"h2"),t._uU(2),t.ALo(3,"translate"),t.qZA(),t.YNc(4,k,8,10,"mat-card",1),t.qZA()),2&e&&(t.xp6(2),t.hij(" ",t.lcZ(3,2,"Employees")," "),t.xp6(2),t.Q6J("ngIf",o.allDone))},dependencies:[c.O5,F.a8,f.SP,f.uX,X,b.X$]}),n})()},{path:"",redirectTo:"list",pathMatch:"full"}];let z=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[C.Bz.forChild($),C.Bz]}),n})();var V=a(5754),W=a(154);let q=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[c.ez,z,V.m,f.Nh,W.S]}),n})()}}]);