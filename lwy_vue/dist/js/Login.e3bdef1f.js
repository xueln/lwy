(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Login"],{a55b:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("my-header"),n("div",{staticClass:"login_bg"},[n("table"),t._m(0),n("div",{staticClass:"content"},[n("h2",[t._v("欢迎回来 \n            "),n("span",{staticClass:"no_user"},[t._v("还没有账号?\n                "),n("a",{attrs:{href:"javascript:;"},on:{click:function(e){return e.preventDefault(),t.goreg(e)}}},[t._v("现在注册")])])]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.myPhone,expression:"myPhone"},{name:"autoFocus",rawName:"v-autoFocus"}],attrs:{id:"phone",placeholder:"请输入手机号 / 邮箱"},domProps:{value:t.myPhone},on:{input:function(e){e.target.composing||(t.myPhone=e.target.value)}}}),n("input",{directives:[{name:"model",rawName:"v-model",value:t.myPwd,expression:"myPwd"}],attrs:{id:"upwd",placeholder:"请输入密码"},domProps:{value:t.myPwd},on:{input:function(e){e.target.composing||(t.myPwd=e.target.value)}}}),n("input",{attrs:{type:"button",value:"立即登录",id:"login"},on:{click:t.loginNow}}),t._m(1),t._m(2),t._m(3)])]),n("my-footer")],1)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"service"},[n("span",[t._v("服务热线：0755-86380505 (8:00－24:00)")]),n("a",{attrs:{href:"javascript:;"}},[t._v("QQ在线交谈")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",[n("input",{attrs:{type:"checkbox",id:"auto"}}),n("label",{attrs:{for:"auto"}},[t._v("30天内免登陆")]),n("a",{attrs:{id:"forget_pwd",href:"javascript:;"}},[t._v("忘记密码?")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"other_login"},[n("span",{staticClass:"left_line"}),t._v("\n                其他方式登录\n                "),n("span",{staticClass:"right_line"})])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",{staticClass:"three"},[n("li",[n("i",{staticClass:"qq_icn"}),n("a",{attrs:{href:""}},[t._v("QQ")])]),n("li",{staticClass:"sina"},[n("i",{staticClass:"sina_icon"}),n("a",{attrs:{href:""}},[t._v("新浪微博")])]),n("li",{staticClass:"zfb"},[n("i",{staticClass:"zfb_icon"}),n("a",{attrs:{href:""}},[t._v("支付宝")])])])}],s=(n("8e6e"),n("ac6a"),n("456d"),n("96cf"),n("3b8d")),i=n("bd86"),o=n("2f62");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,r)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(n,!0).forEach(function(e){Object(i["a"])(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var l={data:function(){return{myPhone:"15101570073",myPwd:"123456n"}},methods:u({},Object(o["b"])(["userLogin"]),{loginNow:function(){var t=this;if(""==this.myPhone||""==this.myPwd)return alert("用户名或密码不能为空"),void document.getElementById("phone").focus();Object(s["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.userLogin(t.QS.stringify({iphone:t.myPhone,upwd:t.myPwd}));case 2:t.getIsLogin?(alert("登录成功"),t.$router.push("Index")):alert("用户名或密码错误"),t.myPhone="",t.myPwd="";case 5:case"end":return e.stop()}},e)}))()},goreg:function(){this.$router.push("/Register")}}),computed:u({},Object(o["c"])(["getIsLogin"])),directives:{autoFocus:{inserted:function(t){t.focus()}}}},p=l,f=(n("d6db"),n("2877")),d=Object(f["a"])(p,r,a,!1,null,null,null);e["default"]=d.exports},a9e7:function(t,e,n){},d6db:function(t,e,n){"use strict";var r=n("a9e7"),a=n.n(r);a.a}}]);
//# sourceMappingURL=Login.e3bdef1f.js.map