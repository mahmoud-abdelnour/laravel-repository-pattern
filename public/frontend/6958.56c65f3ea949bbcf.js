"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6958],{6958:(B,r,a)=>{a.r(r),a.d(r,{AttendanceModule:()=>L});var u=a(6895),d=a(9197),p=a(1511),t=a(4650),f=a(5412),h=a(9242),g=a(3416),v=a(2278),y=a(8038),m=a(3546);const M=["dialog"],A=["table"],C=[{path:"list",component:(()=>{class e{constructor(n,o,i,P,S){this.matDialog=n,this.apiService=o,this.translateService=i,this.themeService=P,this.datePipe=S,this.apiFunc=(c={})=>this.apiService.get(p.A.company.attendance,c),this.settings={columns:{employee_name:{title:" \u0627\u0644\u0645\u0648\u0638\u0641 ",type:"string",filter:!1,valuePrepareFunction:(c,l)=>l.employee.name_ar},date:{title:" \u062f\u062e\u0648\u0644 ",type:"string",filter:!1,valuePrepareFunction:(c,l)=>this.datePipe.transform(l.check_in,"yyyy/MM/dd h:mm a")},check_out:{title:" \u062e\u0631\u0648\u062c ",type:"string",filter:!1,valuePrepareFunction:(c,l)=>this.datePipe.transform(l.check_out,"yyyy/MM/dd h:mm a")}}}}ngOnInit(){}openDialog(n=null){this.matDialog.open(this.dialog,{data:{data:n}}).afterClosed().subscribe(i=>{console.log(`Dialog result: ${i}`)})}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(f.uw),t.Y36(h.s),t.Y36(g.sK),t.Y36(v.f),t.Y36(u.uU))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-list"]],viewQuery:function(n,o){if(1&n&&(t.Gf(M,5),t.Gf(A,5)),2&n){let i;t.iGM(i=t.CRH())&&(o.dialog=i.first),t.iGM(i=t.CRH())&&(o.table=i.first)}},features:[t._Bn([u.uU])],decls:7,vars:2,consts:[[1,"card-cont"],[3,"settings","apiFunc"],["table",""]],template:function(n,o){1&n&&(t.TgZ(0,"section",0)(1,"h2"),t._uU(2," \u0627\u0644\u062d\u0636\u0648\u0631 \u0648\u0627\u0644\u0627\u0646\u0635\u0631\u0627\u0641 "),t.qZA(),t.TgZ(3,"mat-card")(4,"mat-card-content"),t._UZ(5,"app-table",1,2),t.qZA()()()),2&n&&(t.xp6(5),t.Q6J("settings",o.settings)("apiFunc",o.apiFunc))},dependencies:[y.a,m.a8,m.dn]}),e})()},{path:"",redirectTo:"list",pathMatch:"full"}];let F=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[d.Bz.forChild(C),d.Bz]}),e})();var R=a(5754);let L=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[u.ez,F,R.m]}),e})()}}]);