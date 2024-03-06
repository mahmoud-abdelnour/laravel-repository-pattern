"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[9485],{9485:(S,T,i)=>{i.d(T,{o:()=>M});var e=i(4006),d=i(1511),t=i(4650),v=i(2278),c=i(9242),r=i(6895),f=i(1679),g=i(9134),C=i(4859),A=i(5412),b=i(4115),P=i(3848),m=i(2252),E=i(8674),u=i(7392);function h(o,p){if(1&o){const n=t.EpF();t.ynx(0),t.TgZ(1,"button",1),t.NdJ("click",function(){t.CHM(n);const s=t.oxw();return t.KtG(s.parent.takeAction(s.rowData,s.themeService.settings.EMP_SUBSCRIPTION_APPROVE.enum.approved))}),t.TgZ(2,"mat-icon",2),t._uU(3," done "),t.qZA()(),t.TgZ(4,"button",1),t.NdJ("click",function(){t.CHM(n);const s=t.oxw();return t.KtG(s.parent.takeAction(s.rowData,s.themeService.settings.EMP_SUBSCRIPTION_APPROVE.enum.rejected))}),t.TgZ(5,"mat-icon",3),t._uU(6," close "),t.qZA()(),t.BQk()}}let l=(()=>{class o{constructor(n){this.themeService=n}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(v.f))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-payment-actions"]],hostAttrs:[1,"list-actions-btns"],decls:1,vars:1,consts:[[4,"ngIf"],["mat-button","",3,"click"],[1,"primary"],["color","warn"]],template:function(n,a){1&n&&t.YNc(0,h,7,0,"ng-container",0),2&n&&t.Q6J("ngIf",a.rowData.is_approved==a.themeService.settings.EMP_SUBSCRIPTION_APPROVE.enum.pending)},dependencies:[r.O5,u.Hw,C.lW]}),o})();var _=i(3416),I=i(8038);const Z=["paymentTable"];function O(o,p){if(1&o&&t._UZ(0,"app-table",2,3),2&o){const n=t.oxw();t.Q6J("paginationId",n.subscription_type)("settings",n.settings)("apiFunc",n.apiFunc)}}let x=(()=>{class o{constructor(n,a,s,y){this.themeService=n,this.apiService=a,this.translateService=s,this.matDialog=y,this.apiFunc=()=>this.apiService.get(`${d.A.provider.employees}/${this.employeeData.id}/payments`,{subscription_type:this.subscription_type})}ngOnInit(){this.settings=this.subscription_type==this.themeService.settings.SUBSCRIPTION_TYPE.enum.courses?{columns:{payment_amount:{title:"\u0627\u0644\u0645\u0628\u0644\u063a",type:m.Jm.Text,valuePrepareFunction:(n,a)=>(n||0)+" \u0631\u064a\u0627\u0644 ",filter:!1},payment_file_url:{title:"\u0631\u0627\u0628\u0637 \u0627\u0644\u0625\u064a\u0635\u0627\u0644",type:m.Jm.Html,valuePrepareFunction:(n,a)=>`<a href="${n}" target="_blank"> \u0631\u0627\u0628\u0637 \u0627\u0644\u0625\u064a\u0635\u0627\u0644 </a>`,filter:!1},approved_by_user:{title:"\u062a\u0641\u0639\u064a\u0644 \u0628\u0648\u0627\u0633\u0637\u0629",type:m.Jm.Text,filter:!1},is_approved:{title:"\u0627\u0644\u062d\u0627\u0644\u0629",type:m.Jm.Custom,filter:!1,renderComponent:g.p,onComponentInitFunction:n=>{n.statusEnum=this.themeService.settings.EMP_SUBSCRIPTION_APPROVE.enum}},actions:{title:this.translateService.instant("Options"),type:m.Jm.Custom,renderComponent:l,sort:!1,filter:!1,onComponentInitFunction:n=>n.parent=this}}}:{columns:{month:{title:"\u0627\u0644\u0634\u0647\u0631",type:m.Jm.Text,filter:!1,valuePrepareFunction:(n,a)=>n+"/"+a.year},payment_amount:{title:"\u0627\u0644\u0645\u0628\u0644\u063a",type:m.Jm.Text,valuePrepareFunction:(n,a)=>(n||0)+" \u0631\u064a\u0627\u0644 ",filter:!1},payment_file_url:{title:"\u0631\u0627\u0628\u0637 \u0627\u0644\u0625\u064a\u0635\u0627\u0644",type:m.Jm.Html,valuePrepareFunction:(n,a)=>`<a href="${n}" target="_blank"> \u0631\u0627\u0628\u0637 \u0627\u0644\u0625\u064a\u0635\u0627\u0644 </a>`,filter:!1},approved_by_user:{title:"\u062a\u0641\u0639\u064a\u0644 \u0628\u0648\u0627\u0633\u0637\u0629",type:m.Jm.Text,filter:!1},is_approved:{title:"\u0627\u0644\u062d\u0627\u0644\u0629",type:m.Jm.Custom,filter:!1,renderComponent:g.p,onComponentInitFunction:n=>{n.statusEnum=this.themeService.settings.EMP_SUBSCRIPTION_APPROVE.enum}},actions:{title:this.translateService.instant("Options"),type:m.Jm.Custom,renderComponent:l,sort:!1,filter:!1,onComponentInitFunction:n=>n.parent=this}}}}takeAction(n,a){let s=this.themeService.settings.EMP_SUBSCRIPTION_APPROVE.enum,y=this.matDialog.open(E.F);y.componentInstance.header=s[a]+"PaymentTitle",y.componentInstance.body=s[a]+"PaymentMSG",y.componentInstance.confirmBtn=s[a]+"PaymentBtn",y.afterClosed().subscribe(D=>{D&&this.apiService.put(d.A.provider.employees+"/payments/"+n.id,{status:a}).subscribe(J=>{this.themeService.openSnackBar("SavedSuccessfully",null),this.paymentTable.reloadTable()})})}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(v.f),t.Y36(c.s),t.Y36(_.sK),t.Y36(A.uw))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-payment-list"]],viewQuery:function(n,a){if(1&n&&t.Gf(Z,5),2&n){let s;t.iGM(s=t.CRH())&&(a.paymentTable=s.first)}},inputs:{employeeData:"employeeData",subscription_type:"subscription_type"},decls:2,vars:1,consts:[[1,"mt-3","mb-3"],[3,"paginationId","settings","apiFunc",4,"ngIf"],[3,"paginationId","settings","apiFunc"],["paymentTable",""]],template:function(n,a){1&n&&(t.TgZ(0,"div",0),t.YNc(1,O,2,3,"app-table",1),t.qZA()),2&n&&(t.xp6(1),t.Q6J("ngIf",a.settings))},dependencies:[r.O5,I.a]}),o})();function U(o,p){if(1&o&&(t.TgZ(0,"div",13)(1,"h4"),t._uU(2),t.ALo(3,"translate"),t.qZA(),t._UZ(4,"app-file-input",14),t.qZA()),2&o){const n=p.$implicit;t.xp6(2),t.hij(" ",t.lcZ(3,2,n.key)," "),t.xp6(2),t.Q6J("control",n.value)}}function F(o,p){if(1&o&&(t.TgZ(0,"mat-tab",15)(1,"div",16)(2,"mat-tab-group",17)(3,"mat-tab",18),t._UZ(4,"app-payment-list",19),t.qZA(),t.TgZ(5,"mat-tab",20),t._UZ(6,"app-payment-list",19),t.qZA()()()()),2&o){const n=t.oxw();t.xp6(4),t.Q6J("employeeData",n.data)("subscription_type",n.themeService.settings.SUBSCRIPTION_TYPE.enum.membership),t.xp6(2),t.Q6J("employeeData",n.data)("subscription_type",n.themeService.settings.SUBSCRIPTION_TYPE.enum.courses)}}let M=(()=>{class o{constructor(n,a){this.themeService=n,this.apiService=a,this.selectedIndex=0,this.title="CandidateDetails",this.apiFunc=()=>this.apiService.get(`${d.A.provider.employees}/${this.data.id}/payments`)}ngOnInit(){this.form=new e.cw({national_id_file:new e.NI(this.data.national_id_file_url),qualification_file:new e.NI(this.data.qualification_file_url),national_address_file:new e.NI(this.data.national_address_file_url),bank_ipan_file:new e.NI(this.data.bank_ipan_file_url),secret_approvement_file:new e.NI(this.data.secret_approvement_file_url)}),this.form.disable()}}return o.\u0275fac=function(n){return new(n||o)(t.Y36(v.f),t.Y36(c.s))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-employee-data"]],inputs:{data:"data",selectedIndex:"selectedIndex",title:"title"},decls:65,vars:27,consts:[[3,"formGroup"],["mat-dialog-title",""],[1,"mat-typography"],["mat-stretch-tabs","false","mat-align-tabs","center",3,"selectedIndex"],["label","\u0627\u0644\u0628\u064a\u0627\u0646\u0627\u062a \u0627\u0644\u0634\u062e\u0635\u064a\u0629"],[1,"row"],[1,"col-md-4"],[3,"value"],["label","\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062a"],["class","mt-4 mb-4 file-item",4,"ngFor","ngForOf"],["label","\u0627\u0644\u062f\u0641\u0639\u0627\u062a",4,"ngIf"],["align","end",1,"actions"],["type","button","mat-button","","mat-dialog-close","",1,"cancel"],[1,"mt-4","mb-4","file-item"],[3,"control"],["label","\u0627\u0644\u062f\u0641\u0639\u0627\u062a"],[1,"mt-2","mb-2"],["mat-align-tabs","center"],["label","\u0627\u0644\u062f\u0641\u0639\u0627\u062a \u0627\u0644\u0634\u0647\u0631\u064a\u0629"],[3,"employeeData","subscription_type"],["label","\u062f\u0641\u0639\u0627\u062a \u0627\u0644\u062f\u0648\u0631\u0627\u062a"]],template:function(n,a){1&n&&(t.TgZ(0,"form",0)(1,"h2",1),t._uU(2),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"mat-dialog-content",2)(5,"mat-tab-group",3)(6,"mat-tab",4)(7,"section")(8,"div",5)(9,"div",6)(10,"h3"),t._uU(11," \u0627\u0644\u0627\u0633\u0645 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629 "),t.qZA(),t.TgZ(12,"p"),t._uU(13),t.qZA()(),t.TgZ(14,"div",6)(15,"h3"),t._uU(16," \u0627\u0644\u0627\u0633\u0645 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0625\u0646\u062c\u0644\u064a\u0632\u064a\u0629 "),t.qZA(),t.TgZ(17,"p"),t._uU(18),t.qZA()(),t.TgZ(19,"div",6)(20,"h3"),t._uU(21," \u0627\u0644\u0628\u0631\u064a\u062f \u0627\u0644\u0625\u0644\u0643\u062a\u0631\u0648\u0646\u064a "),t.qZA(),t.TgZ(22,"p"),t._uU(23),t.qZA()(),t.TgZ(24,"div",6)(25,"h3"),t._uU(26," \u0631\u0642\u0645 \u0627\u0644\u0647\u0648\u064a\u0629 "),t.qZA(),t.TgZ(27,"p"),t._uU(28),t.qZA()(),t.TgZ(29,"div",6)(30,"h3"),t._uU(31," \u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062a\u0641 "),t.qZA(),t.TgZ(32,"p"),t._uU(33),t.qZA()(),t.TgZ(34,"div",6)(35,"h3"),t._uU(36," \u0627\u0644\u0645\u0624\u0647\u0644 \u0627\u0644\u0639\u0644\u0645\u0649 "),t.qZA(),t.TgZ(37,"p"),t._uU(38),t.ALo(39,"translate"),t.qZA()(),t.TgZ(40,"div",6)(41,"h3"),t._uU(42," \u0627\u0644\u062c\u0646\u0633 "),t.qZA(),t.TgZ(43,"p"),t._uU(44),t.ALo(45,"translate"),t.qZA()(),t.TgZ(46,"div",6)(47,"h3"),t._uU(48," \u0627\u0644\u062d\u0627\u0644\u0629 \u0627\u0644\u0627\u062c\u0645\u0627\u0639\u064a\u0629 "),t.qZA(),t.TgZ(49,"p"),t._uU(50),t.ALo(51,"translate"),t.qZA()(),t.TgZ(52,"div",6)(53,"h3"),t._uU(54," \u062d\u0627\u0644\u0629 \u0627\u0644\u0645\u0648\u0638\u0641 "),t.qZA(),t.TgZ(55,"p"),t._UZ(56,"app-table-status",7),t.qZA()()()()(),t.TgZ(57,"mat-tab",8),t.YNc(58,U,5,4,"div",9),t.ALo(59,"keyvalue"),t.qZA(),t.YNc(60,F,7,4,"mat-tab",10),t.qZA()(),t.TgZ(61,"mat-dialog-actions",11)(62,"button",12),t._uU(63),t.ALo(64,"translate"),t.qZA()()()),2&n&&(t.Q6J("formGroup",a.form),t.xp6(2),t.hij(" ",t.lcZ(3,15,a.title)," "),t.xp6(3),t.Q6J("selectedIndex",a.selectedIndex),t.xp6(8),t.hij(" ",a.data.name_ar," "),t.xp6(5),t.hij(" ",a.data.name_en," "),t.xp6(5),t.hij(" ",a.data.email," "),t.xp6(5),t.hij(" ",a.data.national_id," "),t.xp6(5),t.hij(" ",a.data.mobile," "),t.xp6(5),t.hij(" ",t.lcZ(39,17,a.themeService.settings.QUALIFICATIONS.enum[a.data.qualification])," "),t.xp6(6),t.hij(" ",t.lcZ(45,19,a.themeService.settings.GENDER.enum[a.data.gender])," "),t.xp6(6),t.hij(" ",t.lcZ(51,21,a.themeService.settings.MARTIAL_STATUS.enum[a.data.martial_status])," "),t.xp6(6),t.Q6J("value",a.themeService.settings.EMPLOYEE_STATUS.enum[a.data.status]),t.xp6(2),t.Q6J("ngForOf",t.lcZ(59,23,a.form.controls)),t.xp6(2),t.Q6J("ngIf",1==a.data.is_working),t.xp6(3),t.hij(" ",t.lcZ(64,25,"Back")," "))},dependencies:[r.sg,r.O5,f.Y,g.p,C.lW,e._Y,e.JL,e.sg,A.ZT,A.uh,A.xY,A.H8,b.hL,P.SP,P.uX,x,r.Nd,_.X$],styles:["h3[_ngcontent-%COMP%]{margin-bottom:0;color:var(--label-color)}p[_ngcontent-%COMP%]{margin-top:0}section[_ngcontent-%COMP%]{padding:2rem 0}mat-dialog-content[_ngcontent-%COMP%]{min-height:400px}"]}),o})()},1679:(S,T,i)=>{i.d(T,{Y:()=>E});var e=i(4650),d=i(4763),t=i(6895),v=i(7392),c=i(4859),r=i(4006),f=i(4115),g=i(3416);const C=["control",""];function A(u,h){if(1&u&&(e.TgZ(0,"span",14),e._uU(1),e.qZA()),2&u){const l=e.oxw(2);e.xp6(1),e.hij(" ",l.fileSize," MB ")}}function b(u,h){if(1&u){const l=e.EpF();e.TgZ(0,"button",15),e.NdJ("click",function(){e.CHM(l);const I=e.oxw(2),Z=e.MAs(3);return e.KtG(I.deleteFile(Z))}),e.TgZ(1,"mat-icon"),e._uU(2,"delete"),e.qZA()()}}function P(u,h){if(1&u&&(e.TgZ(0,"a",16)(1,"mat-icon"),e._uU(2,"download"),e.qZA()()),2&u){const l=e.oxw(2);e.Q6J("href",l.control.value,e.LSH)}}function m(u,h){if(1&u&&(e.TgZ(0,"div",8)(1,"span",9),e._uU(2),e.qZA(),e.YNc(3,A,2,1,"span",10),e.TgZ(4,"div",11),e.YNc(5,b,3,0,"button",12),e.YNc(6,P,3,1,"a",13),e.qZA()()),2&u){const l=e.oxw();e.xp6(2),e.hij(" ",(null==l.file?null:l.file.name)||l.fileName," "),e.xp6(1),e.Q6J("ngIf",l.file),e.xp6(2),e.Q6J("ngIf",!l.control.disabled),e.xp6(1),e.Q6J("ngIf",!l.file&&l.control.value)}}let E=(()=>{class u{constructor(){this.accept="image/*",this.deleteEvent=new e.vpe,this.FormMode=d.h}ngOnInit(){this.control.value&&"string"==typeof this.control.value&&(this.fileName=this.control.value.substr(this.control.value.lastIndexOf("/")+1))}fileChanged(l){this.file=l.target.files[0],this.fileSize=(this.file.size/1e6).toFixed(2),this.control.setValue(l.target.files[0]),this.control.markAsTouched()}deleteFile(l){this.file=null,l.type="",l.type="file",this.control.setValue(null),console.log(this.control),this.deleteEvent.emit(this.control)}}return u.\u0275fac=function(l){return new(l||u)},u.\u0275cmp=e.Xpm({type:u,selectors:[["app-file-input","control",""]],inputs:{control:"control",accept:"accept"},outputs:{deleteEvent:"deleteEvent"},attrs:C,decls:11,vars:7,consts:[[1,"data"],[1,"input-cont","form-group"],["id","file","type","file","accept","image/*",3,"change"],["input",""],[1,"d-block"],["for","file"],["type","hidden","name","fileHidden",3,"formControl"],["class","file-info d-flex align-items-center justify-content-between",4,"ngIf"],[1,"file-info","d-flex","align-items-center","justify-content-between"],[1,"file-name"],["class","file-size",4,"ngIf"],[1,"d-flex","justify-content-center","align-items-center"],["mat-button","",3,"click",4,"ngIf"],["mat-button","","target","_blank","type","button","download","",3,"href",4,"ngIf"],[1,"file-size"],["mat-button","",3,"click"],["mat-button","","target","_blank","type","button","download","",3,"href"]],template:function(l,_){1&l&&(e.TgZ(0,"div",0)(1,"div",1)(2,"input",2,3),e.NdJ("change",function(Z){return _.fileChanged(Z)}),e.qZA(),e.TgZ(4,"mat-icon",4),e._uU(5," cloud_upload "),e.qZA(),e.TgZ(6,"label",5),e._uU(7),e.ALo(8,"translate"),e.qZA(),e._UZ(9,"input",6),e.qZA(),e.YNc(10,m,7,4,"div",7),e.qZA()),2&l&&(e.ekj("has-file",!!_.control.value||_.control.disabled),e.xp6(7),e.hij(" ",e.lcZ(8,5,"StartUploadingFile")," "),e.xp6(2),e.Q6J("formControl",_.control),e.xp6(1),e.Q6J("ngIf",_.file||_.control.value||_.control.disabled))},dependencies:[t.O5,v.Hw,c.lW,c.zs,r.Fj,r.JJ,r.oH,f.J5,g.X$],styles:[".invalid-feedback[_ngcontent-%COMP%]{margin-top:-10px}[_nghost-%COMP%]     app-error{position:absolute;left:0;right:-7px;width:140px;bottom:-36px}.file-name[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;min-width:160px}.file-size[_ngcontent-%COMP%]{margin-left:1rem;margin-right:1rem;min-width:160px}.file-info[_ngcontent-%COMP%]{flex-wrap:wrap}"]}),u})()},9134:(S,T,i)=>{i.d(T,{p:()=>v});var e=i(4650),d=i(7331),t=i(3416);let v=(()=>{class c{ngOnInit(){this._value=this.statusEnum&&this.statusEnum[this.value]?this.statusEnum[this.value]:this.value}}return c.\u0275fac=function(f){return new(f||c)},c.\u0275cmp=e.Xpm({type:c,selectors:[["app-table-status"]],hostAttrs:[1,"status"],inputs:{statusEnum:"statusEnum",value:"value"},decls:4,vars:5,template:function(f,g){1&f&&(e.TgZ(0,"mat-chip-list")(1,"mat-chip"),e._uU(2),e.ALo(3,"translate"),e.qZA()()),2&f&&(e.xp6(1),e.Tol(g._value),e.xp6(1),e.hij(" ",e.lcZ(3,3,g._value)," "))},dependencies:[d.qn,d.HS,t.X$]}),c})()}}]);