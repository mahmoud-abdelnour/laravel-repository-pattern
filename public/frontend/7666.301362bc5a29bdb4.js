"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[7666],{7666:(At,R,a)=>{a.r(R),a.d(R,{JobRequestsModule:()=>vt});var u=a(6895),_=a(9197),c=a(2252),x=a(8674),b=a(9134),d=a(1511),N=a(4763),t=a(4650),A=a(2278),T=a(7392),f=a(4859);function M(n,i){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"button",3),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.parent.popDelete(s.rowData))}),t.TgZ(2,"mat-icon",4),t._uU(3," delete "),t.qZA()(),t.BQk()}}const F=function(n){return["/provider/job-requests",n]};let P=(()=>{class n{constructor(e){this.themeService=e,this.FormMode=N.h}ngOnInit(){}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(A.f))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-actions"]],hostAttrs:[1,"list-actions-btns"],decls:4,vars:4,consts:[["target","_blank","mat-button","",3,"routerLink"],["color","success"],[4,"ngIf"],["mat-button","",3,"click"],["color","warn"]],template:function(e,o){1&e&&(t.TgZ(0,"a",0)(1,"mat-icon",1),t._uU(2," visibility "),t.qZA()(),t.YNc(3,M,4,0,"ng-container",2)),2&e&&(t.Q6J("routerLink",t.VKq(2,F,o.rowData.id)),t.xp6(3),t.Q6J("ngIf",o.rowData.request_status==o.themeService.settings.JOB_REQEUST_STATUS.enum.pending))},dependencies:[u.O5,_.yS,T.Hw,f.lW,f.zs],styles:[".assign[_ngcontent-%COMP%]{color:#009688}"]}),n})();var m=a(5412),y=a(9242),h=a(3416),J=a(8038),v=a(3546),r=a(4006),O=a(4115),Z=a(7957),Q=a(3238),C=a(6338),Y=a(4850);function w(n,i){if(1&n&&(t.TgZ(0,"mat-option",15),t._uU(1),t.qZA()),2&n){const e=i.$implicit;t.Q6J("value",e),t.xp6(1),t.hij(" ",e.name_ar," ")}}function D(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",18),t.NdJ("click",function(){t.CHM(e);const s=t.oxw().$implicit,p=t.oxw();return t.KtG(p.deleteItem(s.value))}),t.TgZ(1,"mat-icon",19),t._uU(2,"delete"),t.qZA()()}}function L(n,i){if(1&n&&(t.ynx(0),t.TgZ(1,"mat-list-item")(2,"div",16)(3,"h4"),t._uU(4),t.qZA()(),t.YNc(5,D,3,0,"button",17),t.qZA(),t._UZ(6,"mat-divider"),t.BQk()),2&n){const e=i.$implicit,o=t.oxw();t.xp6(4),t.Oqu(e.value.name_ar),t.xp6(1),t.Q6J("ngIf",o.itemsLength>1)}}function B(n,i){if(1&n&&(t.TgZ(0,"button",20),t._uU(1," \u062d\u0641\u0638 "),t.qZA()),2&n){const e=t.oxw();t.Q6J("disabled",e.isSaving)}}let U=(()=>{class n{constructor(e){this.apiService=e,this.activeItems={},this.itemsLength=0}ngOnInit(){this.form=new r.cw({emp_id:new r.NI(this.data.candidates.map(e=>(this.activeItems[e.id]=e,this.itemsLength+=1,e.id)),r.kI.required)}),this.employees=this.data.candidates}OnSearch(e){this.subscription&&this.subscription.unsubscribe(),this.subscription=this.apiService.post(d.A.provider.search_nominants,{job_request_id:this.data.id,name:e.target.value,limit:!1}).subscribe(o=>{this.employees=o.data})}displayFn(e){return e?.name_ar||""}optionSelected(e){this.activeItems[e.id]||(this.itemsLength+=1,this.activeItems[e.id]=e)}deleteItem(e){this.itemsLength>1&&(delete this.activeItems[e.id],this.itemsLength-=1)}save(){let e=Object.keys(this.activeItems);this.apiService.put(d.A.provider.jobRequests+"/"+this.data.id+"/nominate",{emp_id:e}).subscribe(o=>{console.log(o),this.ref.close(!0)})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(y.s))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-nominate-employees"]],inputs:{ref:"ref",data:"data"},decls:22,vars:11,consts:[[3,"formGroup","ngSubmit"],["mat-dialog-title",""],[1,"mat-typography"],[1,"form-group"],["for","search"],["id","search","type","text",3,"matAutocomplete","keyup"],["input",""],[3,"displayWith","optionSelected"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["mat-subheader",""],[4,"ngFor","ngForOf"],["align","end",1,"actions"],["type","button","mat-button","","mat-dialog-close","",1,"cancel"],["mat-button","","cdkFocusInitial","","class","save",3,"disabled",4,"ngIf"],[3,"value"],["matListItemTitle","",2,"flex","1"],["mat-button","","matListItemMeta","",3,"click",4,"ngIf"],["mat-button","","matListItemMeta","",3,"click"],["color","warn"],["mat-button","","cdkFocusInitial","",1,"save",3,"disabled"]],template:function(e,o){if(1&e&&(t.TgZ(0,"form",0),t.NdJ("ngSubmit",function(){return o.save()}),t.TgZ(1,"h2",1),t._uU(2," \u062a\u0631\u0634\u064a\u062d \u0645\u0648\u0638\u0641\u064a\u0646 "),t.qZA(),t.TgZ(3,"mat-dialog-content",2)(4,"div",3)(5,"label",4),t._uU(6,"\u0627\u0628\u062d\u062b \u0639\u0646 \u0645\u0631\u0634\u062d"),t.qZA(),t.TgZ(7,"input",5,6),t.NdJ("keyup",function(p){return o.OnSearch(p)}),t.qZA()(),t.TgZ(9,"mat-autocomplete",7,8),t.NdJ("optionSelected",function(p){return o.optionSelected(p.option.value)}),t.YNc(11,w,2,2,"mat-option",9),t.qZA(),t.TgZ(12,"mat-list")(13,"h3",10),t._uU(14," \u0627\u0644\u0645\u0631\u0634\u062d\u0648\u0646 "),t.qZA(),t.YNc(15,L,7,2,"ng-container",11),t.ALo(16,"keyvalue"),t.qZA()(),t.TgZ(17,"mat-dialog-actions",12)(18,"button",13),t._uU(19),t.ALo(20,"translate"),t.qZA(),t.YNc(21,B,2,1,"button",14),t.qZA()()),2&e){const s=t.MAs(10);t.Q6J("formGroup",o.form),t.xp6(7),t.Q6J("matAutocomplete",s),t.xp6(2),t.Q6J("displayWith",o.displayFn),t.xp6(2),t.Q6J("ngForOf",o.employees),t.xp6(4),t.Q6J("ngForOf",t.lcZ(16,7,o.activeItems)),t.xp6(4),t.hij(" ",t.lcZ(20,9,"Back")," "),t.xp6(2),t.Q6J("ngIf",!o.form.disabled)}},dependencies:[u.sg,u.O5,T.Hw,f.lW,r._Y,r.JL,r.sg,m.ZT,m.uh,m.xY,m.H8,O.hL,Z.XC,Z.ZL,Q.ey,C.i$,C.Tg,C.gs,Y.d,u.Nd,h.X$],styles:["mat-dialog-content[_ngcontent-%COMP%]{min-width:50vw;min-height:200px;overflow:visible}mat-dialog-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:var(--h-color);font-size:16px}mat-dialog-content[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]{margin-bottom:8px}mat-dialog-content[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-bottom:0;font-size:16px;color:var(--text-color)}mat-dialog-content[_ngcontent-%COMP%]   mat-list-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:var(--par-color)}"]}),n})();const k=["nominate"],G=["table"];function H(n,i){if(1&n&&(t.TgZ(0,"section",2)(1,"h2"),t._uU(2),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"mat-card")(5,"mat-card-content"),t._UZ(6,"app-table",3,4),t.qZA()()()),2&n){const e=t.oxw();t.xp6(2),t.hij(" ",t.lcZ(3,3,"JobRequests")," "),t.xp6(4),t.Q6J("settings",e.settings)("apiFunc",e.apiFunc)}}function $(n,i){if(1&n&&t._UZ(0,"app-nominate-employees",5),2&n){const o=i.dialogRef;t.Q6J("data",i.$implicit.data)("ref",o)}}let X=(()=>{class n{constructor(e,o,s,p,S){this.matDialog=e,this.apiService=o,this.translateService=s,this.datePipe=p,this.themeService=S,this.apiFunc=(q={})=>this.apiService.get(d.A.provider.jobRequests,{...q}),this.jobs={}}ngOnInit(){this.apiService.get(d.A.provider.jobs,{limit:!1}).subscribe(e=>{for(let o of e.data)this.jobs[o.id]=o;this.settings={columns:{company:{title:"\u0627\u0644\u0634\u0631\u0643\u0629",type:c.Jm.Text,filter:!0,valuePrepareFunction:(o,s)=>o.name_ar},job_id:{title:"\u0627\u0644\u0648\u0638\u064a\u0641\u0629",type:c.Jm.Text,filter:!0,valuePrepareFunction:(o,s)=>this.jobs[o].job_title},created_at:{title:"\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0637\u0644\u0628",type:c.Jm.Text,valuePrepareFunction:(o,s)=>this.datePipe.transform(o,"yyyy/MM/dd")},count:{title:"\u0627\u0644\u0639\u062f\u062f \u0627\u0644\u0645\u0637\u0644\u0648\u0628",type:c.Jm.Text},request_status:{title:"\u0627\u0644\u062d\u0627\u0644\u0629",type:c.Jm.Custom,renderComponent:b.p,onComponentInitFunction:o=>{o.statusEnum=this.themeService.settings.JOB_REQEUST_STATUS.enum}},actions:{title:this.translateService.instant("Options"),type:c.Jm.Custom,renderComponent:P,sort:!1,filter:!1,onComponentInitFunction:o=>o.parent=this}}}})}nominateEmplloyees(e){this.matDialog.open(this.nominate,{data:{data:e}}).afterClosed().subscribe(s=>{s&&this.table.reloadTable()})}popDelete(e){this.rowToDelete=e.id,this.matDialog.open(x.F,{data:{parent:this}})}delete(){this.apiService.delete(d.A.provider.jobRequests+"/"+this.rowToDelete).subscribe(e=>{this.themeService.openSnackBar("DeleteSuccessMSG",null),this.table.reloadTable()})}popApprove(e){this.rowToDelete=e.id;let o=this.matDialog.open(x.F);o.componentInstance.header="\u0625\u0639\u062a\u0645\u0627\u062f \u0637\u0644\u0628",o.componentInstance.body="\u0647\u0644 \u062a\u0631\u064a\u062f \u0625\u0639\u062a\u0645\u0627\u062f \u0647\u0630\u0627 \u0627\u0644\u0637\u0644\u0628\u061f",o.componentInstance.confirmBtn="\u0625\u0639\u062a\u0645\u0627\u062f",o.afterClosed().subscribe(s=>{s&&this.apiService.put(d.A.provider.jobRequests+"/"+e.id+"/approve").subscribe(p=>{this.themeService.openSnackBar("SavedSuccessfully",null),this.table.reloadTable()})})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(m.uw),t.Y36(y.s),t.Y36(h.sK),t.Y36(u.uU),t.Y36(A.f))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-list"]],viewQuery:function(e,o){if(1&e&&(t.Gf(k,5),t.Gf(G,5)),2&e){let s;t.iGM(s=t.CRH())&&(o.nominate=s.first),t.iGM(s=t.CRH())&&(o.table=s.first)}},features:[t._Bn([u.uU])],decls:3,vars:1,consts:[["class","card-cont",4,"ngIf"],["nominate",""],[1,"card-cont"],[3,"settings","apiFunc"],["table",""],[3,"data","ref"]],template:function(e,o){1&e&&(t.YNc(0,H,8,5,"section",0),t.YNc(1,$,1,2,"ng-template",null,1,t.W1O)),2&e&&t.Q6J("ngIf",o.settings)},dependencies:[u.O5,J.a,v.a8,v.dn,U,h.X$]}),n})();var W=a(9646),E=a(8746),z=a(9485),j=a(9807);function K(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",0),t.NdJ("click",function(){t.CHM(e);const s=t.oxw(2);return t.KtG(s.parent.openAcceptRejectDialog(s.rowData))}),t.TgZ(1,"mat-icon",4),t._uU(2," verified "),t.qZA()()}}function V(n,i){if(1&n&&(t.ynx(0),t.YNc(1,K,3,0,"button",3),t.BQk()),2&n){const e=t.oxw();t.xp6(1),t.Q6J("ngIf",e.showInsuranceButton)}}let tt=(()=>{class n{constructor(e){this.themeService=e}ngOnInit(){console.log(this.rowData),this.rowData.insurance&&(this.showInsuranceButton=this.rowData.pivot.emp_response_status==this.themeService.settings.EMPLOYEE_REPONSE_STATUS.enum.accepted&&this.rowData.pivot.company_response_status==this.themeService.settings.COMPANY_REPONSE_STATUS.enum.accepted&&this.rowData.pivot.status==this.themeService.settings.JOB_REQUEST_CANDIDATE_STATUS.enum.pending)}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(A.f))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-request-emp-actions"]],hostAttrs:[1,"list-actions-btns"],decls:4,vars:1,consts:[["mat-button","",3,"click"],["color","primary"],[4,"appPerm"],["mat-button","",3,"click",4,"ngIf"],[1,"verified"]],template:function(e,o){1&e&&(t.TgZ(0,"button",0),t.NdJ("click",function(){return o.parent.openEmployeeDialog(o.rowData)}),t.TgZ(1,"mat-icon",1),t._uU(2," visibility "),t.qZA()(),t.YNc(3,V,2,1,"ng-container",2)),2&e&&(t.xp6(3),t.Q6J("appPerm","approve_job_request"))},dependencies:[u.O5,j.$,T.Hw,f.lW],styles:[".verified[_ngcontent-%COMP%]{color:var(--main-color)}"]}),n})();function et(n,i){if(1&n&&(t.TgZ(0,"a",3),t._uU(1," \u0645\u0644\u0641 \u0627\u0644\u062a\u0623\u0645\u064a\u0646\u0627\u062a\n"),t.qZA()),2&n){const e=t.oxw();t.Q6J("href",e.value.insurance,t.LSH)}}function nt(n,i){1&n&&(t.TgZ(0,"p",4),t._uU(1," \u0644\u0645 \u064a\u062a\u0645 \u0625\u0636\u0627\u0641\u0629 \u0645\u0644\u0641 \u0627\u0644\u062a\u0623\u0645\u064a\u0646\u0627\u062a "),t.qZA())}let I=(()=>{class n{constructor(){}ngOnInit(){}}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-request-status"]],decls:4,vars:4,consts:[[3,"value","statusEnum"],["mat-button","","download","",3,"href",4,"ngIf","ngIfElse"],["noValue",""],["mat-button","","download","",3,"href"],[1,"m-0"]],template:function(e,o){if(1&e&&(t._UZ(0,"app-table-status",0),t.YNc(1,et,2,1,"a",1),t.YNc(2,nt,2,0,"ng-template",null,2,t.W1O)),2&e){const s=t.MAs(3);t.Q6J("value",o.value.value||"pending")("statusEnum",o.value.enum),t.xp6(1),t.Q6J("ngIf",o.value.insurance)("ngIfElse",s)}},dependencies:[u.O5,b.p,f.zs],styles:["p[_ngcontent-%COMP%]{text-align:center;font-size:13px}a[_ngcontent-%COMP%]{display:block;margin-top:5px}"]}),n})();var ot=a(1679);let it=(()=>{class n{constructor(e){this.apiService=e,this.isSaving=!1}ngOnInit(){this.form=new r.cw({company_file:new r.NI(this.data.insurance?.company_file),emp_file:new r.NI(this.data.insurance?.emp_file)}),this.form.disable(),console.log(this.form)}save(){this.isSaving=!0,this.apiService.put(`${d.A.provider.insurances}/${this.data.insurance.id}/approve`).pipe((0,E.x)(()=>this.isSaving=!1)).subscribe(e=>{this.ref.close(!0)})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(y.s))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-accept-reject-nominant"]],inputs:{ref:"ref",data:"data"},decls:18,vars:7,consts:[[3,"formGroup"],["mat-dialog-title",""],[1,"mat-typography"],[1,"mt-4","mb-4","file-item"],[3,"control"],["align","end",1,"actions"],["type","button","mat-button","","mat-dialog-close","",1,"cancel"],["mat-button","","cdkFocusInitial","",1,"save",3,"disabled","click"]],template:function(e,o){1&e&&(t.TgZ(0,"form",0)(1,"h2",1),t._uU(2," \u0625\u0639\u062a\u0645\u0627\u062f \u0627\u0644\u062a\u0623\u0645\u064a\u0646\u0627\u062a "),t.qZA(),t.TgZ(3,"mat-dialog-content",2)(4,"div",3)(5,"h4"),t._uU(6," \u0645\u0644\u0641 \u062a\u0623\u0645\u064a\u0646 \u0627\u0644\u0634\u0631\u0643\u0629 "),t.qZA(),t._UZ(7,"app-file-input",4),t.qZA(),t.TgZ(8,"div",3)(9,"h4"),t._uU(10," \u0645\u0644\u0641 \u062a\u0623\u0645\u064a\u0646 \u0627\u0644\u0645\u0648\u0638\u0641 "),t.qZA(),t._UZ(11,"app-file-input",4),t.qZA()(),t.TgZ(12,"mat-dialog-actions",5)(13,"button",6),t._uU(14),t.ALo(15,"translate"),t.qZA(),t.TgZ(16,"button",7),t.NdJ("click",function(){return o.save()}),t._uU(17," \u0625\u0639\u062a\u0645\u0627\u062f "),t.qZA()()()),2&e&&(t.Q6J("formGroup",o.form),t.xp6(7),t.Q6J("control",o.form.controls.company_file),t.xp6(4),t.Q6J("control",o.form.controls.emp_file),t.xp6(3),t.hij(" ",t.lcZ(15,5,"Back")," "),t.xp6(2),t.Q6J("disabled",o.isSaving))},dependencies:[ot.Y,f.lW,r._Y,r.JL,r.sg,m.ZT,m.uh,m.xY,m.H8,O.hL,h.X$],styles:["mat-dialog-content[_ngcontent-%COMP%]{min-height:350px}"]}),n})();const st=["acceptRejectNominate"];function at(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",16),t.NdJ("click",function(){t.CHM(e);const s=t.oxw(3),p=t.MAs(2);return t.KtG(s.nominateEmplloyees(p))}),t.TgZ(1,"mat-icon"),t._uU(2,"add"),t.qZA(),t._uU(3," \u0625\u0636\u0627\u0641\u0629 \u0645\u0631\u0634\u062d\u064a\u0646 "),t.qZA()}}function ut(n,i){if(1&n&&(t.ynx(0),t.YNc(1,at,4,0,"button",15),t.BQk()),2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("ngIf",e.jobRequest.request_status==e.themeService.settings.JOB_REQEUST_STATUS.enum.pending)}}function ct(n,i){if(1&n){const e=t.EpF();t.TgZ(0,"button",18),t.NdJ("click",function(){t.CHM(e);const s=t.oxw(3);return t.KtG(s.acceptRequest())}),t._uU(1),t.ALo(2,"translate"),t.qZA()}if(2&n){const e=t.oxw(3);t.Q6J("disabled",e.isSaving),t.xp6(1),t.hij(" ",t.lcZ(2,2,"\u0625\u0639\u062a\u0645\u0627\u062f \u0637\u0644\u0628 \u0627\u0644\u062a\u0648\u0638\u064a\u0641")," ")}}function rt(n,i){if(1&n&&(t.ynx(0),t.YNc(1,ct,3,4,"button",17),t.BQk()),2&n){const e=t.oxw(2);t.xp6(1),t.Q6J("ngIf",e.jobRequest.can_be_approved)}}function pt(n,i){if(1&n&&(t.ynx(0),t.TgZ(1,"section",3)(2,"mat-card")(3,"mat-card-content")(4,"h2"),t._uU(5),t.ALo(6,"translate"),t.qZA(),t.TgZ(7,"section")(8,"div",4)(9,"div",5)(10,"h3"),t._uU(11," \u0627\u0633\u0645 \u0627\u0644\u0634\u0631\u0643\u0629 "),t.qZA(),t.TgZ(12,"p"),t._uU(13),t.qZA()(),t.TgZ(14,"div",5)(15,"h3"),t._uU(16," \u0627\u0644\u0648\u0638\u064a\u0641\u0629 "),t.qZA(),t.TgZ(17,"p"),t._uU(18),t.qZA()(),t.TgZ(19,"div",5)(20,"h3"),t._uU(21," \u0627\u0644\u0639\u062f\u062f \u0627\u0644\u0645\u0637\u0644\u0648\u0628 "),t.qZA(),t.TgZ(22,"p"),t._uU(23),t.qZA()(),t.TgZ(24,"div",5)(25,"h3"),t._uU(26," \u062a\u0627\u0631\u064a\u062e \u0627\u0644\u0637\u0644\u0628 "),t.qZA(),t.TgZ(27,"p"),t._uU(28),t.ALo(29,"date"),t.qZA()(),t.TgZ(30,"div",5)(31,"h3"),t._uU(32," \u062d\u0627\u0644\u0629 \u0627\u0644\u0637\u0644\u0628 "),t.qZA(),t._UZ(33,"app-table-status",6),t.qZA(),t.TgZ(34,"div",7)(35,"h3"),t._uU(36," \u0645\u0644\u0627\u062d\u0638\u0627\u062a \u0627\u0644\u0637\u0644\u0628 "),t.qZA(),t.TgZ(37,"p"),t._uU(38),t.qZA()()()()()()(),t.TgZ(39,"section",3)(40,"mat-card")(41,"mat-card-content")(42,"div",8)(43,"h2"),t._uU(44),t.ALo(45,"translate"),t.qZA(),t.YNc(46,ut,2,1,"ng-container",9),t.qZA(),t._UZ(47,"app-table",10,11),t.qZA(),t.TgZ(49,"mat-card-actions",12)(50,"div",13)(51,"button",14),t._uU(52),t.ALo(53,"translate"),t.qZA(),t.YNc(54,rt,2,1,"ng-container",9),t.qZA()()()(),t.BQk()),2&n){const e=t.oxw();t.xp6(5),t.hij(" ",t.lcZ(6,14,"JobRequestDetails")," "),t.xp6(8),t.hij(" ",e.jobRequest.company.name_ar," "),t.xp6(5),t.hij(" ",e.jobRequest.job.job_title," "),t.xp6(5),t.hij(" ",e.jobRequest.count," "),t.xp6(5),t.hij(" ",t.xi3(29,16,e.jobRequest.created_at,"yyyy/MM/dd")," "),t.xp6(5),t.Q6J("value",e.jobRequest.request_status)("statusEnum",e.themeService.settings.JOB_REQEUST_STATUS.enum),t.xp6(5),t.hij(" ",e.jobRequest.notes," "),t.xp6(6),t.hij(" ",t.lcZ(45,19,"\u0627\u0644\u0645\u0631\u0634\u062d\u0648\u0646")," "),t.xp6(2),t.Q6J("appPerm","approve_job_request"),t.xp6(1),t.Q6J("settings",e.settings)("apiFunc",e.apiFunc),t.xp6(5),t.hij(" ",t.lcZ(53,21,"Back")," "),t.xp6(2),t.Q6J("appPerm","approve_job_request")}}function lt(n,i){if(1&n&&t._UZ(0,"app-nominate-employees",19),2&n){const e=i.dialogRef,o=t.oxw();t.Q6J("data",o.jobRequest)("ref",e)}}function mt(n,i){if(1&n&&t._UZ(0,"app-accept-reject-nominant",19),2&n){const o=i.dialogRef;t.Q6J("data",i.$implicit.data)("ref",o)}}const dt=[{path:"list",component:X},{path:":requestId",component:(()=>{class n{constructor(e,o,s,p,S,q,bt){this.apiService=e,this.activatedRoute=o,this.themeService=s,this.datePipe=p,this.translateService=S,this.matDialog=q,this.router=bt,this.settings={columns:{employee:{title:"\u0627\u0633\u0645 \u0627\u0644\u0645\u0631\u0634\u062d",type:c.Jm.Text,sort:!1,filter:!1,valuePrepareFunction:(g,l)=>l.name_ar},created_at:{title:"\u062a\u0627\u0631\u064a\u062e \u0627\u0644\u062a\u0631\u0634\u064a\u062d",type:c.Jm.Text,sort:!1,filter:!1,valuePrepareFunction:(g,l)=>this.datePipe.transform(l.pivot.created_at,"yyyy/MM/dd")},emp_response_status:{title:"\u062d\u0627\u0644\u0629 \u0627\u0644\u0645\u0648\u0638\u0641",type:c.Jm.Custom,sort:!1,filter:!1,renderComponent:I,valuePrepareFunction:(g,l)=>({enum:this.themeService.settings.EMPLOYEE_REPONSE_STATUS.enum,value:l.pivot.emp_response_status,insurance:l.insurance?.emp_file_url})},company_response_status:{title:"\u062d\u0627\u0644\u0629 \u0627\u0644\u0634\u0631\u0643\u0629",type:c.Jm.Custom,sort:!1,filter:!1,renderComponent:I,valuePrepareFunction:(g,l)=>({enum:this.themeService.settings.COMPANY_REPONSE_STATUS.enum,value:l.pivot.company_response_status,insurance:l.insurance?.company_file_url})},status:{title:"\u062d\u0627\u0644\u0629 \u0627\u0644\u0625\u0639\u062a\u0645\u0627\u062f",type:c.Jm.Custom,sort:!1,filter:!1,renderComponent:b.p,valuePrepareFunction:(g,l)=>l.pivot.status,onComponentInitFunction:g=>{g.statusEnum=this.themeService.settings.JOB_REQUEST_CANDIDATE_STATUS.enum}},actions:{title:this.translateService.instant("Options"),type:c.Jm.Custom,renderComponent:tt,sort:!1,filter:!1,onComponentInitFunction:g=>g.parent=this}}},this.isSaving=!1}ngOnInit(){this.jobRequest=null,this.requestId=this.activatedRoute.snapshot.params.requestId,this.apiService.get(d.A.provider.jobRequests+"/"+this.activatedRoute.snapshot.params.requestId).subscribe(e=>{this.jobRequest=e.JobRequest,this.apiFunc=()=>(0,W.of)({data:this.jobRequest.candidates})})}openAcceptRejectDialog(e){this.matDialog.open(this.acceptRejectNominate,{data:{data:e},width:"80vw"}).afterClosed().subscribe(s=>{s&&window.location.reload()})}openEmployeeDialog(e){const o=this.matDialog.open(z.o,{width:"90vw"});o.componentInstance.data=e,o.afterClosed().subscribe(s=>{})}nominateEmplloyees(e){this.matDialog.open(e).afterClosed().subscribe(s=>{s&&this.ngOnInit()})}acceptRequest(){this.isSaving=!0,this.apiService.put(d.A.provider.jobRequests+"/"+this.requestId+"/approve").pipe((0,E.x)(()=>this.isSaving=!1)).subscribe(e=>{this.themeService.openSnackBar("SavedSuccessfully",null),this.router.navigate(["/provider/job-requests/list"]),console.log(e)})}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(y.s),t.Y36(_.gz),t.Y36(A.f),t.Y36(u.uU),t.Y36(h.sK),t.Y36(m.uw),t.Y36(_.F0))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-request"]],viewQuery:function(e,o){if(1&e&&t.Gf(st,5),2&e){let s;t.iGM(s=t.CRH())&&(o.acceptRejectNominate=s.first)}},features:[t._Bn([u.uU])],decls:5,vars:1,consts:[[4,"ngIf"],["nominate",""],["acceptRejectNominate",""],[1,"card-cont"],[1,"row"],[1,"col-md-4"],[3,"value","statusEnum"],[1,"col-md-12"],[1,"d-flex","align-items-center","justify-content-between","mb-4"],[4,"appPerm"],[3,"settings","apiFunc"],["table",""],[1,"actions","mb-4"],[1,"d-flex","align-items-center","justify-content-end","ps-4","pe-4"],["type","button","mat-button","","routerLink","/provider/job-requests/list",1,"cancel"],["class","add-btn","mat-raised-button","",3,"click",4,"ngIf"],["mat-raised-button","",1,"add-btn",3,"click"],["mat-button","","class","save",3,"disabled","click",4,"ngIf"],["mat-button","",1,"save",3,"disabled","click"],[3,"data","ref"]],template:function(e,o){1&e&&(t.YNc(0,pt,55,23,"ng-container",0),t.YNc(1,lt,1,2,"ng-template",null,1,t.W1O),t.YNc(3,mt,1,2,"ng-template",null,2,t.W1O)),2&e&&t.Q6J("ngIf",o.jobRequest)},dependencies:[u.O5,_.rH,J.a,b.p,j.$,T.Hw,v.a8,v.dn,v.hq,f.lW,U,it,u.uU,h.X$],styles:[".card-cont[_ngcontent-%COMP%]{margin-bottom:32px}.card-cont[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding-top:16px;padding-bottom:16px}.card-cont[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:var(--text-color);margin-top:0}.card-cont[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]   app-table-status[_ngcontent-%COMP%]{width:120px;display:inline-block}h3[_ngcontent-%COMP%]{margin-bottom:0;color:var(--label-color)}p[_ngcontent-%COMP%]{margin-top:0}"]}),n})()},{path:"",redirectTo:"list",pathMatch:"full"}];let gt=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[_.Bz.forChild(dt),_.Bz]}),n})();var ft=a(5754),_t=a(3848),ht=a(154);let vt=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[u.ez,gt,ft.m,_t.Nh,Z.Bb,C.ie,ht.S]}),n})()}}]);