"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6765],{6765:(y,d,a)=>{a.r(d),a.d(d,{ResignsModule:()=>B});var u=a(6895),l=a(9197),g=a(2252),f=a(1511),m=a(9134),t=a(4650),r=a(5412),p=a(9242),T=a(2278),A=a(8015),h=a(3416),b=a(8038),F=a(7392),S=a(3546),D=a(4859),c=a(4006),L=a(8746),R=a(4763),U=a(4115);let M=(()=>{class n{constructor(s,e,o,C){this.apiService=s,this.translateSerivce=e,this.themeService=o,this.userService=C,this.FormMode=R.h,this.firstTime=!1}ngOnInit(){this.form=new c.cw({notes:new c.NI(null)})}save(){if(this.form.invalid)return;console.log(this.form.value),this.isSaving=!0;let s=new FormData,e={...this.form.value};s.append("notes",e.notes),this.apiService.post(f.A.employee.resigns,s).pipe((0,L.x)(()=>this.isSaving=!1)).subscribe(o=>{console.log(o),this.themeService.openSnackBar(this.translateSerivce.instant("SavedSuccessfully"),null),this.ref.close(!0)})}}return n.\u0275fac=function(s){return new(s||n)(t.Y36(p.s),t.Y36(h.sK),t.Y36(T.f),t.Y36(A.K))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-create"]],inputs:{data:"data",mode:"mode",ref:"ref"},decls:28,vars:16,consts:[[3,"formGroup","ngSubmit"],["mat-dialog-title",""],[1,"mat-typography"],[1,"row"],[1,"col-md-6","mb-4","form-group"],["for","amount"],[1,"form-control"],[1,"col-md-12","mb-4","form-group"],["for","notes"],["name","notes","id","notes","cols","15","formControlName","notes",3,"placeholder"],["align","end",1,"actions"],["type","button","mat-button","","mat-dialog-close","",1,"cancel"],["mat-button","","cdkFocusInitial","",1,"save",3,"disabled"]],template:function(s,e){1&s&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return e.save()}),t.TgZ(1,"h2",1),t._uU(2," \u0637\u0644\u0628 \u0627\u0646\u0647\u0627\u0621 \u062a\u0639\u0627\u0642\u062f "),t.qZA(),t.TgZ(3,"mat-dialog-content",2)(4,"div",3)(5,"div",4)(6,"label",5),t._uU(7),t.ALo(8,"translate"),t.qZA(),t.TgZ(9,"div",6),t._uU(10),t.qZA()(),t.TgZ(11,"div",4)(12,"label",5),t._uU(13),t.ALo(14,"translate"),t.qZA(),t.TgZ(15,"div",6),t._uU(16),t.qZA()(),t.TgZ(17,"div",7)(18,"label",8),t._uU(19),t.ALo(20,"translate"),t.qZA(),t._UZ(21,"textarea",9),t.ALo(22,"translate"),t.qZA()()(),t.TgZ(23,"mat-dialog-actions",10)(24,"button",11),t._uU(25," \u0631\u062c\u0648\u0639 "),t.qZA(),t.TgZ(26,"button",12),t._uU(27," \u0637\u0644\u0628 \u0627\u0646\u0647\u0627\u0621 \u062a\u0639\u0627\u0642\u062f "),t.qZA()()()),2&s&&(t.Q6J("formGroup",e.form),t.xp6(7),t.hij(" ",t.lcZ(8,8,"\u0627\u0644\u0648\u0638\u064a\u0641\u0629 \u0627\u0644\u062d\u0627\u0644\u064a\u0629 ")," "),t.xp6(3),t.Oqu(null==e.userService||null==e.userService.userData||null==e.userService.userData.entity||null==e.userService.userData.entity.job?null:e.userService.userData.entity.job.job_title),t.xp6(3),t.hij(" ",t.lcZ(14,10," \u0627\u0644\u0634\u0631\u0643\u0629 ")," "),t.xp6(3),t.Oqu(null==e.userService||null==e.userService.userData||null==e.userService.userData.entity||null==e.userService.userData.entity.company?null:e.userService.userData.entity.company.name_ar),t.xp6(3),t.hij(" ",t.lcZ(20,12,"Notes")," "),t.xp6(2),t.Q6J("placeholder",t.lcZ(22,14,"Notes")),t.xp6(5),t.Q6J("disabled",e.isSaving))},dependencies:[D.lW,c._Y,c.Fj,c.JJ,c.JL,c.sg,c.u,r.ZT,r.uh,r.xY,r.H8,U.hL,U.J5,h.X$]}),n})();const E=["dialog"],J=["table"];function Y(n,i){if(1&n){const s=t.EpF();t.TgZ(0,"mat-card-header")(1,"div",5),t._UZ(2,"div"),t.TgZ(3,"button",6),t.NdJ("click",function(){t.CHM(s);const o=t.oxw();return t.KtG(o.openDialog())}),t.TgZ(4,"mat-icon"),t._uU(5,"add"),t.qZA(),t._uU(6," \u0637\u0644\u0628 \u0627\u0646\u0647\u0627\u0621 \u062a\u0639\u0627\u0642\u062f "),t.qZA()()()}}function j(n,i){if(1&n&&t._UZ(0,"app-create",7),2&n){const e=i.$implicit;t.Q6J("ref",i.dialogRef)("data",e.data)}}const O=[{path:"list",component:(()=>{class n{constructor(s,e,o,C,N,G){this.matDialog=s,this.apiService=e,this.themeService=o,this.userService=C,this.translateService=N,this.datePipe=G,this.apiFunc=(v={})=>this.apiService.get(f.A.employee.resigns,v),this.settings={columns:{task_title:{title:" \u0627\u0644\u0648\u0638\u064a\u0641\u0629 ",type:"string",filter:!1,valuePrepareFunction:(v,Z)=>Z.employee.job.job_title},date:{title:"\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0627\u0633\u0646\u0627\u062f",type:"string",filter:!1,valuePrepareFunction:(v,Z)=>this.datePipe.transform(Z.created_at,"yyyy/MM/dd")},status:{title:"\u0627\u0644\u062d\u0627\u0644\u0629",filter:!1,type:g.Jm.Custom,renderComponent:m.p,onComponentInitFunction:v=>{v.statusEnum=this.themeService.settings.RESIGN_STATUS.enum}}}}}ngOnInit(){}openDialog(s=null){this.matDialog.open(this.dialog,{data:{data:s}}).afterClosed().subscribe(o=>{console.log(`Dialog result: ${o}`)})}}return n.\u0275fac=function(s){return new(s||n)(t.Y36(r.uw),t.Y36(p.s),t.Y36(T.f),t.Y36(A.K),t.Y36(h.sK),t.Y36(u.uU))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-list"]],viewQuery:function(s,e){if(1&s&&(t.Gf(E,5),t.Gf(J,5)),2&s){let o;t.iGM(o=t.CRH())&&(e.dialog=o.first),t.iGM(o=t.CRH())&&(e.table=o.first)}},features:[t._Bn([u.uU])],decls:10,vars:3,consts:[[1,"card-cont"],[4,"ngIf"],[3,"settings","apiFunc"],["table",""],["dialog",""],[1,"d-flex","align-items-center","justify-content-between"],["mat-raised-button","",1,"add-btn",3,"click"],[3,"ref","data"]],template:function(s,e){1&s&&(t.TgZ(0,"section",0)(1,"h2"),t._uU(2," \u0637\u0644\u0628\u0627\u062a \u0627\u0646\u0647\u0627\u0621 \u0627\u0644\u062a\u0639\u0627\u0642\u062f "),t.qZA(),t.TgZ(3,"mat-card"),t.YNc(4,Y,7,0,"mat-card-header",1),t.TgZ(5,"mat-card-content"),t._UZ(6,"app-table",2,3),t.qZA()()(),t.YNc(8,j,1,2,"ng-template",null,4,t.W1O)),2&s&&(t.xp6(4),t.Q6J("ngIf",0==(null==e.userService||null==e.userService.userData||null==e.userService.userData.entity?null:e.userService.userData.entity.current_resigns)),t.xp6(2),t.Q6J("settings",e.settings)("apiFunc",e.apiFunc))},dependencies:[u.O5,b.a,F.Hw,S.a8,S.dk,S.dn,D.lW,M]}),n})()},{path:"",redirectTo:"list",pathMatch:"full"}];let I=(()=>{class n{}return n.\u0275fac=function(s){return new(s||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[l.Bz.forChild(O),l.Bz]}),n})();var P=a(5754);let B=(()=>{class n{}return n.\u0275fac=function(s){return new(s||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[u.ez,I,P.m]}),n})()},9134:(y,d,a)=>{a.d(d,{p:()=>f});var u=a(4650),l=a(7331),g=a(3416);let f=(()=>{class m{ngOnInit(){this._value=this.statusEnum&&this.statusEnum[this.value]?this.statusEnum[this.value]:this.value}}return m.\u0275fac=function(r){return new(r||m)},m.\u0275cmp=u.Xpm({type:m,selectors:[["app-table-status"]],hostAttrs:[1,"status"],inputs:{statusEnum:"statusEnum",value:"value"},decls:4,vars:5,template:function(r,p){1&r&&(u.TgZ(0,"mat-chip-list")(1,"mat-chip"),u._uU(2),u.ALo(3,"translate"),u.qZA()()),2&r&&(u.xp6(1),u.Tol(p._value),u.xp6(1),u.hij(" ",u.lcZ(3,3,p._value)," "))},dependencies:[l.qn,l.HS,g.X$]}),m})()},4763:(y,d,a)=>{a.d(d,{h:()=>u});var u=(()=>{return(l=u||(u={})).Create="Create",l.Update="Update",l.View="View",l.Delete="Delete",u;var l})()}}]);