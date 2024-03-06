"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[6617],{6617:(J,d,e)=>{e.r(d),e.d(d,{LoginModule:()=>U});var g=e(6895),s=e(9197),c=e(7461),r=e(4006),f=e(8746),h=e(1511),t=e(4650),y=e(9242),x=e(8015),C=e(2759),p=e(3546),b=e(4859),m=e(4115),v=e(3416);function M(n,l){1&n&&(t.ynx(0),t.TgZ(1,"div",17),t._UZ(2,"input",18),t.ALo(3,"translate"),t.qZA(),t.BQk()),2&n&&(t.xp6(2),t.Q6J("placeholder",t.lcZ(3,1,"IDNumber")))}function O(n,l){1&n&&(t.TgZ(0,"div",17),t._UZ(1,"input",19),t.ALo(2,"translate"),t.qZA()),2&n&&(t.xp6(1),t.Q6J("placeholder",t.lcZ(2,1,"CommercialRecord")))}const P=function(n){return[n]},Z=function(n){return{userType:n}};let u=(()=>{class n{constructor(a,o,i,I){this.apiService=a,this.router=o,this.userService=i,this.activatedRoute=I,this.UserType=c.F,this.loginOptions={[c.F.employee]:{url:"/auth/login/company",registerUrl:"/auth/register/employee",title:"LoginAsCompany"},[c.F.company]:{url:"/auth/login/employee",registerUrl:"/auth/register/company",title:"LoginAsEmployee"}},this.isSending=!1}ngOnInit(){this.userType=this.activatedRoute.snapshot.data.userType,this.createForm()}createForm(){this.form=new r.cw({password:new r.NI(null,r.kI.required)}),this.form.addControl(this.userType==c.F.employee?"national_id":"commercial_record",new r.NI(null,r.kI.required)),this.form.updateValueAndValidity()}login(){if(console.log(this.form),this.form.invalid)return;let a={...this.form.value};this.isSending=!0,this.apiService.post(h.A.login,a).pipe((0,f.x)(()=>this.isSending=!1)).subscribe(o=>{let{data:i}=o;console.log(i),localStorage.setItem("access_token",i.access_token),localStorage.setItem("expires_at",i.expires_at),localStorage.setItem("token_type",i.token_type),localStorage.setItem("user",JSON.stringify(i.user)),this.userService.userData=i.user,this.router.navigate(["/home"])})}}return n.\u0275fac=function(a){return new(a||n)(t.Y36(y.s),t.Y36(s.F0),t.Y36(x.K),t.Y36(s.gz))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-login"]],decls:42,vars:39,consts:[[1,"cont"],[1,"container"],[1,"row"],[1,"col-md-6","col-xl-5","info"],["src","./assets/imgs/app-logo3.png","alt",""],[1,"col-xl-2","d-none","d-xl-block"],[1,"col-md-6","col-xl-5"],[3,"formGroup","ngSubmit"],[4,"ngIf","ngIfElse"],["showComp",""],[1,"form-group","mb-4"],["validate-onblur","","type","text","type","password","formControlName","password",3,"placeholder"],[1,"d-flex","justify-content-between"],[3,"routerLink"],[1,"actions"],["mat-raised-button","",1,"primary",3,"disabled"],["mat-raised-button","","type","button",1,"secondary",3,"routerLink","queryParams"],[1,"form-group","mb-4","mt-4"],["validate-onblur","","type","text","formControlName","national_id",3,"placeholder"],["validate-onblur","","type","text","formControlName","commercial_record",3,"placeholder"]],template:function(a,o){if(1&a&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._UZ(4,"img",4),t.TgZ(5,"h1"),t._uU(6),t.ALo(7,"translate"),t.qZA(),t.TgZ(8,"p"),t._uU(9),t.ALo(10,"translate"),t.qZA()(),t._UZ(11,"div",5),t.TgZ(12,"div",6)(13,"form",7),t.NdJ("ngSubmit",function(){return o.login()}),t.TgZ(14,"mat-card")(15,"mat-card-content")(16,"h4"),t._uU(17),t.ALo(18,"translate"),t.qZA(),t.TgZ(19,"p"),t._uU(20),t.ALo(21,"translate"),t.qZA(),t.YNc(22,M,4,3,"ng-container",8),t.YNc(23,O,3,3,"ng-template",null,9,t.W1O),t.TgZ(25,"div",10),t._UZ(26,"input",11),t.ALo(27,"translate"),t.qZA(),t.TgZ(28,"div",12)(29,"a",13),t._uU(30),t.ALo(31,"translate"),t.qZA(),t.TgZ(32,"a",13),t._uU(33),t.ALo(34,"translate"),t.qZA()(),t.TgZ(35,"div",14)(36,"button",15),t._uU(37),t.ALo(38,"translate"),t.qZA(),t.TgZ(39,"button",16),t._uU(40),t.ALo(41,"translate"),t.qZA()()()()()()()()()),2&a){const i=t.MAs(24);t.xp6(6),t.hij(" ",t.lcZ(7,17,"loginTitle1")," "),t.xp6(3),t.hij(" ",t.lcZ(10,19,"loginTitle2")," "),t.xp6(4),t.Q6J("formGroup",o.form),t.xp6(4),t.hij(" ",t.lcZ(18,21,"Login")," "),t.xp6(3),t.hij(" ",t.lcZ(21,23,"InsertLogin")," "),t.xp6(2),t.Q6J("ngIf",o.userType==o.UserType.employee)("ngIfElse",i),t.xp6(4),t.Q6J("placeholder",t.lcZ(27,25,"Password")),t.xp6(3),t.Q6J("routerLink",o.loginOptions[o.userType].url),t.xp6(1),t.hij(" ",t.lcZ(31,27,o.loginOptions[o.userType].title)," "),t.xp6(2),t.Q6J("routerLink","/auth/forget-password"),t.xp6(1),t.hij(" ",t.lcZ(34,29,"ForgetPassword")," "),t.xp6(3),t.Q6J("disabled",o.isSending),t.xp6(1),t.hij(" ",t.lcZ(38,31,"Login")," "),t.xp6(2),t.Q6J("routerLink",t.VKq(35,P,o.loginOptions[o.userType].registerUrl))("queryParams",t.VKq(37,Z,o.userType)),t.xp6(1),t.hij(" ",t.lcZ(41,33,"RegisterNew")," ")}},dependencies:[g.O5,s.rH,s.yS,C.i,p.a8,p.dn,b.lW,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u,m.hL,m.J5,v.X$],styles:["div.cont[_ngcontent-%COMP%]{width:100vw;height:100vh;display:flex;align-items:center;background:linear-gradient(225deg,#154398 0%,#143F94,#208BE1,#208be1 100%),url(login-bg.056120122e878ead.png) center center;background-blend-mode:multiply;background-size:cover}.info[_ngcontent-%COMP%]{text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center}.info[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:206px}.info[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#fff;margin-top:32px;font-size:32px}.info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:-22px 0 0;font-size:18px;color:#fff}@media (min-width: 576px) and (max-width: 1199px){.container[_ngcontent-%COMP%]{max-width:100%!important;padding-right:1rem;padding-left:1rem}}@media (max-width: 767px){mat-card.mat-card[_ngcontent-%COMP%]{border-radius:16px;padding-top:3rem;padding-bottom:3rem;margin-top:2rem}}[dir=ltr]   [_nghost-%COMP%]   mat-card[_ngcontent-%COMP%]{border-radius:60px 0 0}[_nghost-%COMP%]   mat-tab-group[_ngcontent-%COMP%]     mat-tab-header{border-bottom:none}[_nghost-%COMP%]   mat-tab-group[_ngcontent-%COMP%]     mat-tab-header .mat-tab-labels{justify-content:center}[_nghost-%COMP%]   mat-tab-group[_ngcontent-%COMP%]     mat-tab-header .mat-tab-labels .mat-tab-label{font-size:16px;opacity:1}mat-card[_ngcontent-%COMP%]{padding:80px 60px;border-radius:0 60px 0 0;box-shadow:none}mat-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#208be1;font-size:24px;margin-bottom:0}mat-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-top:0;margin-bottom:32px}mat-card[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background-color:#f3f6f9;border-color:#fff}mat-card[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#208be1;text-decoration:none;font-size:14px}mat-card[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{width:100%;display:block;border-radius:100px;height:46px;font-size:16px;box-shadow:none}mat-card[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.primary[_ngcontent-%COMP%]{background-color:#0069bd;color:#fff;margin-bottom:16px;margin-top:32px}mat-card[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]   button.secondary[_ngcontent-%COMP%]{color:#0069bd;border:1px solid #0069BD}"]}),n})();const L=[{path:"employee",component:u,data:{userType:c.F.employee}},{path:"company",component:u,data:{userType:c.F.company}},{path:"",redirectTo:"employee",pathMatch:"full"}];let T=(()=>{class n{}return n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[s.Bz.forChild(L),s.Bz]}),n})();var A=e(5754),S=e(3848);let U=(()=>{class n{}return n.\u0275fac=function(a){return new(a||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[g.ez,T,A.m,S.Nh]}),n})()}}]);