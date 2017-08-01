"use strict";angular.module("app",["ui.router","ngCookies","validation"]),angular.module("app").value("dist",{}).run(["dist","$http",function(t,e){e.get("data/city.json").success(function(e){t.city=e}),e.get("data/salary.json").success(function(e){t.salary=e}),e.get("data/scale.json").success(function(e){t.scale=e})}]),angular.module("app").config(["$provide",function(t){t.decorator("$http",["$delegate","$q",function(t,e){return t.post=function(o,n,i){var a=e.defer();return t.get(o).success(function(t){a.resolve(t)}).error(function(t){a.reject(t)}),{success:function(t){a.promise.then(t)},error:function(t){a.promise.then(t)}}},t}])}]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/position.html",controller:"positionCtrl"}).state("company",{url:"/company/:id",templateUrl:"view/company.html",controller:"companyCtrl"}).state("search",{url:"/search/:id",templateUrl:"view/search.html",controller:"searchCtrl"}).state("login",{url:"/login",templateUrl:"view/login.html",controller:"loginCtrl"}).state("register",{url:"/register",templateUrl:"view/register.html",controller:"registerCtrl"}).state("me",{url:"/me",templateUrl:"view/me.html",controller:"meCtrl"}).state("post",{url:"/post",templateUrl:"view/post.html",controller:"postCtrl"}).state("favorite",{url:"/favorite",templateUrl:"view/favorite.html",controller:"favoriteCtrl"}),e.otherwise("/main")}]),angular.module("app").config(["$validationProvider",function(t){var e={phone:/^1[3|4|5|8][0-9]\d{8}$/,password:function(t){return t.length>5},required:function(t){return!!t}},o={phone:{success:"",error:"请输入11位数字"},password:{success:"",error:"长度至少6位"},required:{success:"",error:"不能为空"}};t.setExpression(e).setDefaultMsg(o)}]),angular.module("app").controller("companyCtrl",["$http","$state","$scope",function(t,e,o){t.get("data/company.json?id="+e.params.id).success(function(t){o.company=t,o.$broadcast("asd",{id:1})}),o.$on("dsa",function(t,e){console.log(t,e)})}]),angular.module("app").controller("favoriteCtrl",["$state","$http","$scope",function(t,e,o){e.get("data/myFavorite.json").success(function(t){o.positionList=t})}]),angular.module("app").controller("loginCtrl",["cache","$state","$http","$scope",function(t,e,o,n){n.submit=function(){o.post("data/login.json",n.user).success(function(o){t.put("id",o.id),t.put("name",o.name),t.put("image",o.image),e.go("main")})}}]),angular.module("app").controller("mainCtrl",["$http","$scope",function(t,e){t.get("/data/positionList.json").success(function(t){e.list=t})}]),angular.module("app").controller("meCtrl",["cache","$state","$http","$scope",function(t,e,o,n){t.get("name")&&(n.name=t.get("name"),n.image=t.get("image")),n.loginOut=function(){t.remove("id"),t.remove("name"),t.remove("image"),e.go("main")}}]),angular.module("app").controller("positionCtrl",["cache","$scope","$http","$state","$q",function(t,e,o,n,i){function a(t){o.get("/data/company.json?id="+t).success(function(t){e.com=t})}e.isLogin=!!t.get("name"),e.message=e.isLogin?"投个简历":"去登陆",function(){var t=i.defer();return o.get("/data/position.json?id="+n.params.id).success(function(o){e.data=o,o.posted&&(e.message="已投递"),t.resolve(o)}).error(function(e){t.reject(e)}),t.promise}().then(function(t){a(t.companyId)}),e.go=function(){"已投递"!=e.message&&(console.log(e.isLogin),e.isLogin?o.post("data/handle.json",{id:e.data.id}).success(function(t){console.log(t)}):n.go("login"))}}]),angular.module("app").controller("postCtrl",["$state","$http","$scope",function(t,e,o){o.tabList=[{id:"all",name:"全部"},{id:"pass",name:"面试邀请"},{id:"fail",name:"不合适"}],e.get("data/myPost.json").success(function(t){o.positionList=t}),o.filterObj={},o.tClick=function(t,e){switch(t){case"all":delete o.filterObj.state;break;case"pass":o.filterObj.state="1";break;case"fail":o.filterObj.state="-1"}}}]),angular.module("app").controller("registerCtrl",["$interval","$state","$http","$scope",function(t,e,o,n){n.submit=function(){o.post("data/regist.json",n.user).success(function(t){console.log(t),e.go("login")})};var i=60;n.send=function(){o.get("data/code.json").success(function(e){if(1==e.state){i=60,n.time="60s";var o=t(function(){i<=0?(t.cancel(o),n.time=""):(i--,n.time=i+"s")},1e3)}})}}]),angular.module("app").controller("searchCtrl",["dist","$http","$state","$scope",function(t,e,o,n){n.name="",n.search=function(){e.get("data/positionList.json").success(function(t){n.positionList=t})},n.search(),n.sheet={},n.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪水"},{id:"scale",name:"公司规模"}];var i="";n.filterObj={},n.tClick=function(e,o){i=e,n.sheet.list=t[e],n.sheet.visible=!0},n.sClick=function(t,e){t?(angular.forEach(n.tabList,function(t){t.id==i&&(t.name=e)}),n.filterObj[i+"Id"]=t,console.log(n.filterObj)):(delete n.filterObj[i+"Id"],angular.forEach(n.tabList,function(t){if(t.id==i)switch(t.id){case"city":t.name="城市";break;case"salary":t.name="薪水";break;case"scale":t.name="公司规模"}}))}}]),angular.module("app").directive("appCompany",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/company.html",scope:{com:"="}}}]),angular.module("app").directive("appFoot",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/foot.html"}}]),angular.module("app").directive("appHead",["cache",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html",link:function(e){e.name=t.get("name"),console.log(e.name)}}}]),angular.module("app").directive("appHeadBar",[function(){return{restrict:"A",replace:!0,templateUrl:"view/template/headBar.html",scope:{text:"="},link:function(t){t.back=function(){window.history.back()}}}}]),angular.module("app").directive("appPositionClas",[function(){return{restrict:"AE",replace:!0,templateUrl:"view/template/positionclas.html",scope:{com:"="},link:function(t,e,o){t.showPositionList=function(e){t.positionList=t.com.positionClass[e].positionList,t.isActive=e},t.$watch("com",function(e){e&&t.showPositionList(0)}),t.$on("asd",function(t,e){console.log(t,e)}),t.$emit("dsa",{asd:2})}}}]),angular.module("app").directive("appPositionInfo",["$http",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/positionInfo.html",scope:{isActive:"=",isLogin:"=",pos:"="},link:function(e){e.$watch("pos",function(t){t&&(e.pos.select=e.pos.select||!1,e.imgPath=e.pos.select?"image/star-active.png":"image/star.png")}),e.favorite=function(o){t.post("data/favorite.json",{id:o.id,select:o.select}).success(function(t){e.pos.select=!e.pos.select,e.imgPath=e.pos.select?"image/star-active.png":"image/star.png"})}}}}]),angular.module("app").directive("appPositionList",["$http",function(t){return{resstrict:"A",replace:!0,templateUrl:"view/template/positionList.html",scope:{data:"=",filterObj:"=",isShowStar:"="},link:function(e){e.select=function(e){t.post("data/favorite.json",{id:e.id,select:!e.select}).success(function(t){e.select=!e.select})}}}}]),angular.module("app").directive("appSheet",[function(){return{resstrict:"A",replace:!0,templateUrl:"view/template/sheet.html",scope:{list:"=",visible:"=",select:"&"}}}]),angular.module("app").directive("appTab",[function(){return{resstrict:"A",replace:!0,templateUrl:"view/template/tab.html",scope:{tabClick:"&",list:"="},link:function(t){t.click=function(e){t.selectId=e.id,t.tabClick(e)}}}}]),angular.module("app").filter("filterByObj",[function(){return function(t,e){var o=[];return angular.forEach(t,function(t){var n=!0;for(var i in e)t[i]!==e[i]&&(n=!1);n&&o.push(t)}),o}}]),angular.module("app").service("cache",["$cookieStore",function(t){this.put=function(e,o){t.put(e,o)},this.get=function(e){return t.get(e)},this.remove=function(e){t.remove(e)}}]);