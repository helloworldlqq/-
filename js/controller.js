/**
 * Created by LiuQiang on 2017/3/28.
 */
angular.module('myApp.controller', [])
     // 主菜单
    .controller('menuController',['$scope','report', function ($scope,report) {
        $.getScript('menu-js/simplify/simplify.js');
        $.getScript('menu-js/jquery.slimscroll.min.js');
        $.getScript('menu-js/jquery.flot.min.js');
        $.getScript('menu-js/simplify/simplify_dashboard.js');

        $scope.userName=report.getUserLogin().user.username;
        $scope.organizationName=report.getUserLogin().user.organization.name;


    }])
    // 登陆页
    // .controller('loginController', function ($state, $scope, $rootScope, report) {
    //     //登陆的点击事件
    //     $scope.loginAction = function () {
    //         report.login($scope.userName, $scope.userPassword).then(function (d) {
    //             console.log(d);
    //             //判断登陆是否成功：是进行跳转及存储登陆接口信息;否sweetAlert
    //             if (d.data.result) {
    //                 report.setUserLogin(d.data.result);
    //                 $state.go('menu.report');
    //             } else {
    //                 swal("用户名或密码错误", "请重新输入");
    //                 $state.go('login')
    //             }
    //         }, function (d) {
    //             console.log(d)
    //         });
    //     }
    // })
    //申报页
    // .controller('reportController', function ($scope, report, $rootScope, $filter) {
    //     // 申报参数对象
    //     $scope.o = {
    //         token: report.getUserLogin().token,
    //         staff: '',
    //         staffRelationship: 1,
    //         staffPoliticalStatus: '',
    //         staffJob: 1,
    //         staffSpouse: '',
    //         staffPhone: '',
    //         eventType: 1,
    //         eventCount: 1,
    //         eventDate: '',
    //         location: '',
    //         tableCount: 1,
    //         peopleCount: 1,
    //         peopleRange: '',
    //         carCount: 1,
    //         carSource: '',
    //         attachmentFileCode: '',
    //         selfPromise: '',
    //         promisePeople: '',
    //         staffOrgId: 1
    //     };
    //    //申报界面的四个多选表单--1.对象;2.初始值;3.选框change事件
    //     $scope.staffRelationshipArr = [{'i': 1, 'v': '本人'}, {'i': 2, 'v': '直系亲属'}];
    //     $scope.rel = $scope.staffRelationshipArr[0];
    //     $scope.staffJobArr = [{'i': 1, 'v': '县级党员干部'}, {'i': 2, 'v': '科级党员干部'}, {'i': 3, 'v': '社区基层干部'}, {'i': 4, 'v': '一般工作人员'}];
    //     $scope.job = $scope.staffJobArr[0];
    //     $scope.eventTypeArr = [{'i': 1, 'v': '婚嫁'}, {'i': 2, 'v': '丧葬'}];
    //     $scope.event = $scope.eventTypeArr[0];
    //     (function (){
    //         report.getOrgId($scope.o.token).then(function(d){
    //             // console.log(d.data.result);
    //             $scope.staffOrgIdArr=d.data.result.children;
    //             $scope.staffOrgIdArr.unshift({'father':'father','id':d.data.result.id,'name':d.data.result.name});
    //             $scope.org = $scope.staffOrgIdArr[0];
    //         },function(d){
    //             console.log(d)
    //         });
    //     })()
    //     $scope.staffRelationshipMake = function (o) {                                                    //
    //         $scope.o.staffRelationship = o.i;
    //     };
    //     $scope.staffJobMake = function (o) {                                                    //
    //         $scope.o.staffJob = o.i;
    //     };
    //     $scope.eventTypeMake = function (o) {                                                    //
    //         $scope.o.eventType = o.i;
    //     };
    //     $scope.staffOrgIdMake = function (o) {
    //         $scope.o.staffOrgId = o.id;
    //     };
    //     //申报提交的点击事件
    //     $scope.reportSubmit = function () {
    //         //判断信息是否完整：否提示输入完整;是掉接口
    //         if ($scope.report.$invalid) {
    //             swal("请出入完整信息");
    //         } else {
    //             //判断时间是否给定：是转换格式;否获取当前并转换格式
    //             if (!$scope.initDate) {
    //                 var date = new Date();
    //                 $scope.o.eventDate = $filter('date')(date, 'yyyy-MM-dd hh:mm:ss');
    //             } else {
    //                 $scope.o.eventDate = $filter('date')($scope.initDate, 'yyyy-MM-dd hh:mm:ss');
    //             }
    //             // 调接口
    //             report.report($scope.o);
    //             swal("申报成功!", "You clicked the button!", "success")
    //         }
    //     }
    // })
    // .controller('approvalController', function ($filter,$scope, $rootScope, report) {
    //     //审批查询输入的参数
    //     $scope.o = {
    //         token: report.getUserLogin().token,
    //         staff: '',
    //         auditStatus: -1,
    //         page: 1,
    //         start: 0,
    //         limit: 9
    //     };
    //     //审批状态多选表单--1.对象;2.初始值;3.选框change事件
    //     $scope.auditArr = [{'i': '-1', 'v': '待审核'}, {'i': '1', 'v': '通过'}, {'i': '2', 'v': '拒绝'}];
    //     $scope.audit = $scope.auditArr[0];
    //     $scope.auditMake = function (o) {
    //         $scope.o.auditStatus = o.i;
    //     };
    //
    //     $scope.order=function (a,ord) {
    //         if(ord==1){
    //             $scope.isTrue=false;
    //             $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
    //         }else if(ord==-1){
    //             $scope.isTrue=true;
    //             $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
    //         }
    //     }
    //
    //
    //     //调接口查询获取数组
    //     $scope.getApprovalArr=function (v) {
    //         report.approvalSearch(v).then(function (d) {
    //             if (!d.data.result.length) {
    //                 swal("查询信息不存在", "请重新输入");
    //             } else {
    //                 $scope.arr = d.data.result;
    //                 $scope.total = d.data.total-14;
    //                 $scope.pageSum = Math.ceil($scope.total / $scope.o.limit);
    //             }
    //         }, function (d) {
    //             console.log(d)
    //         });
    //     }
    //     //初始显示
    //     $scope.getApprovalArr($scope.o);
    //     //查询点击事件
    //     $scope.search = function () {
    //         $scope.o.page = '1';
    //         $scope.o.start = '0';
    //         $scope.o.staff = $scope.staff;
    //         $scope.getApprovalArr($scope.o);
    //     };
    //     //首页
    //     $scope.firstPage = function () {
    //         $scope.o.page = '1';
    //         $scope.o.start = '0';
    //         $scope.getApprovalArr($scope.o);
    //     };
    //     //上一页
    //     $scope.prePage = function () {
    //         if ($scope.o.page > 1) {
    //             $scope.o.page--;
    //             $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
    //             $scope.getApprovalArr($scope.o);
    //         }
    //     };
    //     //下一页
    //     $scope.nextPage = function () {
    //         if ($scope.o.page < $scope.pageSum) {
    //             $scope.o.page++;
    //             $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
    //             $scope.getApprovalArr($scope.o);
    //         }
    //     };
    //     //尾页
    //     $scope.lastPage = function () {
    //         $scope.o.page = $scope.pageSum;
    //         $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
    //         $scope.getApprovalArr($scope.o);
    //     };
    //     //刷新
    //     $scope.refreshPage = function () {
    //         $scope.o.page = '1';
    //         $scope.o.start = '0';
    //         $scope.getApprovalArr($scope.o);
    //     };
    //     $scope.approvalMakeO = {
    //         token: report.getUserLogin().token,//令牌
    //         eventId: '',
    //         status: '',
    //         content: ''
    //     };
    //     $scope.approvalMake = function (t, id) {
    //         $scope.approvalMakeO.eventId = id;
    //         $scope.approvalMakeO.status = t;
    //         swal({
    //                 title: "意见",
    //                 text: "请填写审批意见！",
    //                 type: "input",
    //                 showCancelButton: true,
    //                 closeOnConfirm: false,
    //                 animation: "slide-from-top",
    //                 inputPlaceholder: "Write something"
    //             },
    //             function (inputValue) {
    //                 if (inputValue === false) return false;
    //                 if (inputValue === "") {
    //                     swal.showInputError("You need to write something!");
    //                     return false
    //                 }
    //                 $scope.approvalMakeO.content = inputValue;
    //                 swal("审评成功!", "You wrote: " + inputValue, "success");
    //                 // 调同意和拒绝的接口
    //                 report.approvalMake($scope.approvalMakeO);
    //             });
    //         //重新获取数据
    //         setTimeout(function (){$scope.getApprovalArr($scope.o)},200)
    //     };
    // })
    //公示页
    // .controller('publicityController', function ($filter,$state, $scope, $rootScope, report) {
    //     $scope.x = '-1';
    //     $scope.nowPage = 1;
    //     $scope.totalPage = 1;
    //     $scope.publicityName = '';
    //     $scope.publicityPage = 0;
    //     $scope.publicityStart = 0;
    //     $scope.publicityLimit = 9;
    //   //公示页排序
    //     $scope.order=function (a,ord) {
    //         if(ord==1){
    //             $scope.isTrue=false;
    //             $scope.showList=$filter('orderBy')($scope.showList,a,$scope.isTrue);
    //         }else if(ord==-1){
    //             $scope.isTrue=true;
    //             $scope.showList=$filter('orderBy')($scope.showList,a,$scope.isTrue);
    //         }
    //     }
    //     $scope.get = function () {
    //         publicityList = {
    //             token: report.getUserLogin().token,
    //             staff: $scope.publicityName,
    //             bulletinStatus: $scope.x,
    //             page: $scope.publicityPage,
    //             start: $scope.publicityStart,
    //             limit: $scope.publicityLimit
    //         };
    //         report.showList(publicityList).then(function (response) {
    //             console.log(response);
    //             $scope.showList = response.data.result;
    //             $scope.publicityTotal = response.data.total;
    //             $scope.totalPage = Math.ceil(response.data.total / $scope.publicityLimit);
    //         });
    //     }
    //     $scope.get();
    //     $scope.publicityGet = function () {
    //         publicityList.page=1;
    //         publicityList.start=0;
    //         $scope.get();
    //         $scope.publicityFirst();
    //     }
    //     $scope.publicityNext = function () {
    //         if ($scope.publicityStart < ($scope.totalPage - 1) * $scope.publicityLimit) {
    //             $scope.publicityStart = $scope.publicityStart + $scope.publicityLimit;
    //             $scope.get();
    //             $scope.nowPage = $scope.nowPage + 1;
    //         }
    //     }
    //     $scope.publicityUp = function () {
    //         if ($scope.publicityStart > 0) {
    //             $scope.publicityStart = $scope.publicityStart - $scope.publicityLimit;
    //             $scope.get();
    //             $scope.nowPage = $scope.nowPage - 1;
    //         }
    //     }
    //     $scope.publicityFirst = function () {
    //             $scope.publicityStart = 0;
    //             $scope.get();
    //             $scope.nowPage = 1;
    //     }
    //     $scope.publicityLast = function () {
    //         $scope.publicityStart = ($scope.totalPage - 1) * $scope.publicityLimit;
    //         $scope.get();
    //         $scope.nowPage = $scope.totalPage;
    //     }
    //     //公示内容提交
    //     $scope.showContent = function (id) {
    //         $scope.id = id;
    //     };
    //     $scope.content = '';
    //     $scope.attachmentFileCode = '';
    //     $scope.ContentUp = function () {
    //         $scope.showContentList = {
    //             token: report.getUserLogin().token,
    //             eventId: $scope.id,
    //             content: $scope.content,
    //             attachmentFileCode: ''
    //         };
    //
    //         if(!$scope.content){
    //             sweetAlert("内容不能为空！", "Something went wrong!", "error");
    //         }else {
    //
    //             report.showContentUp($scope.showContentList).then(function (response) {
    //                 console.log(response);
    //             })
    //             $scope.get();
    //             swal("公示成功！", "", "success");
    //         }
    //
    //     }
    //     $scope.resultStatus = '1';
    //
    //    $scope.showResultContent='';
    //     $scope.resultUp = function () {
    //         $scope.showResultList = {
    //             token: report.getUserLogin().token,
    //             eventId: $scope.id,
    //             status: $scope.resultStatus,
    //             content:$scope.showResultContent
    //         };
    //         console.log($scope.showResultContent);
    //         if (!$scope.showResultContent) {
    //
    //             sweetAlert("内容不能为空！", "Something went wrong!", "error");
    //         }else {
    //
    //             report.showResultUp($scope.showResultList).then(function (response) {
    //                 console.log(response);
    //             })
    //             $scope.get();
    //             swal("公示结果成功！", "", "success");
    //         }
    //
    //     }
    // })
    //现场监督页
    // .controller('supervisionController', function ($filter,$state, $scope, $rootScope, report) {
    //     //状态多选表单----1.对象;2.初始值;3.选框change事件
    //     $scope.auditArr = [{'i': '-1', 'v': '未监督'}, {'i': '1', 'v': '已监督'}];
    //     $scope.audit = $scope.auditArr[0];
    //     $scope.auditMake = function (o) {
    //         $scope.o.superviseStatus = o.i;
    //     };
    //     //现场监督页排序
    //     $scope.order=function (a,ord) {
    //         if(ord==1){
    //             $scope.isTrue=false;
    //             $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
    //         }else if(ord==-1){
    //             $scope.isTrue=true;
    //             $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
    //         }
    //     }
    //     //现场监督查询输入的参数
    //     $scope.o = {
    //         token: report.getUserLogin().token,
    //         staff: '',
    //         superviseStatus: -1,  //-1为未公;1未公示
    //         page: 1,//当前页数
    //         start: 0,//从第几个开始
    //         limit: 9//每页显示多少个
    //     };
    //     //调接口查询获取数组
    //     $scope.getSupervisionArr=function (v) {
    //         report.supervisionSearch(v).then(function (d) {
    //             if (!d.data.result.length) {
    //                 swal("查询信息不存在", "请重新输入");
    //             } else {
    //                 $scope.arr = d.data.result;
    //                 if($scope.o.superviseStatus==-1){
    //                     $scope.total = d.data.total-725;
    //                 }else{
    //                     $scope.total = d.data.total-59;
    //                 }
    //                 $scope.pageSum = Math.ceil($scope.total / $scope.o.limit);
    //             }
    //         }, function (d) {
    //             console.log(d)
    //         });
    //     }
    //     //初始显示
    //     $scope.getSupervisionArr($scope.o);
    //     $scope.search = function () {                                                   //查询的按钮
    //         $scope.o.page = '1';
    //         $scope.o.start = '0';
    //         $scope.o.staff = $scope.staff;
    //         $scope.getSupervisionArr($scope.o);
    //     };
    //     $scope.firstPage = function () {
    //         $scope.o.page = '1';
    //         $scope.o.start = '0';
    //         $scope.getSupervisionArr($scope.o);
    //     };
    //     $scope.prePage = function () {
    //         if ($scope.o.page > 1) {
    //             $scope.o.page--;
    //             $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
    //             $scope.getSupervisionArr($scope.o);
    //         }
    //     };
    //     $scope.nextPage = function () {
    //         if ($scope.o.page < $scope.pageSum) {
    //             $scope.o.page++;
    //             $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
    //             $scope.getSupervisionArr($scope.o);
    //         }
    //     };
    //     $scope.lastPage = function () {
    //         $scope.o.page = $scope.pageSum;
    //         $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
    //         console.log($scope.o.start);
    //         $scope.getSupervisionArr($scope.o);
    //     };
    //     $scope.refreshPage = function () {
    //         $scope.o.page = '1';
    //         $scope.o.start = '0';
    //         $scope.getSupervisionArr($scope.o);
    //     };
    //     $scope.MakeO = {
    //         token: report.getUserLogin().token,//令牌
    //         eventId: ''//待审批项目id
    //     };
    //     $scope.MakeTitleOKO = {
    //         token: report.getUserLogin().token,//令牌
    //         eventId: '',//待审批项目id
    //         title: '',//审核状态 1：通过 2：拒绝
    //         content: ''//审批意见内容
    //     };
    //     $scope.MakeTitleNOO = {
    //         token: report.getUserLogin().token,//令牌
    //         eventId: '',//待审批项目id
    //         isCashGiftOutOfLimits: 0,
    //         isUsePublicCar: 0,
    //         isUsePublicGoods: 0,
    //         isUsePublicAsserts: 0,
    //         isUsePublicMoney: 0,
    //         attachmentFileCode: '',
    //         otherQuestion: '',
    //         content: ''//审批意见内容
    //     };
    //     $scope.getId = function (id) {
    //         $scope.MakeO.eventId = id;
    //         $scope.MakeTitleOKO.eventId = id;
    //         $scope.MakeTitleNOO.eventId = id;
    //     }
    //     $scope.makeOk = function () {
    //         // 调同意和拒绝的接口
    //         report.supervisionMakeOk($scope.MakeO);
    //         report.supervisionMakeTitleOk($scope.MakeTitleOKO);
    //         console.log(123);
    //         swal("报告填写完成!", "success");
    //         //获取数据
    //         setTimeout(function(){
    //             $scope.getSupervisionArr($scope.o);
    //         },200)
    //     };
    //     $scope.makeNO = function () {
    //         // 调同意和拒绝的接口
    //         report.supervisionMakeNO($scope.MakeO);
    //         report.supervisionMakeTitleNO($scope.MakeTitleOKO);
    //         swal("违纪登记完成!", "success");
    //         //获取数据
    //         setTimeout(function(){
    //             $scope.getSupervisionArr($scope.o);
    //         },200)
    //     };
    // })
    //精确查询
    // .controller('accurateController', function ($filter,$state, $scope, $rootScope, report) {
    //     //部门类别调用
    //     var token = report.getUserLogin().token;
    //     $scope.accurateSelect = [];
    //     report.accurateArray(token).then(function (response) {
    //         console.log(response.data.result);
    //         $scope.accurateSelect = response.data.result.children;
    //         $scope.accurateSelect.unshift(response.data.result);
    //     })
    //     //精确查询页面数据调用
    //     $scope.select = 1;
    //     $scope.accurateUserName = '';
    //     $scope.accurateGet = function () {  //数据接口调用
    //         accurateGet = {
    //             token: report.getUserLogin().token,
    //             staff: $scope.accurateUserName,
    //             staffOrgId: $scope.select,
    //             page: '0',
    //             start: '0',
    //             limit: '20'
    //         };
    //         report.accurateList(accurateGet).then(function (response) {
    //             // console.log(response.data.result);
    //             $scope.accurateNumber = 10;
    //             $scope.accurateShouList = response.data.result;
    //             $scope.accuratePageTatal = Math.ceil($scope.accurateShouList.length / $scope.accurateNumber);
    //
    //         })
    //     }
    //     //精确查询页排序
    //     $scope.order=function (a,ord) {
    //         if(ord==1){
    //             console.log(a);
    //             $scope.isTrue=false;
    //             $scope.accurateShouList=$filter('orderBy')($scope.accurateShouList,a,$scope.isTrue);
    //         }else if(ord==-1){
    //             $scope.isTrue=true;
    //             $scope.accurateShouList=$filter('orderBy')($scope.accurateShouList,a,$scope.isTrue);
    //         }
    //     }
    //     //精确查询分页
    //     $scope.accurateLimit = 0;
    //     $scope.accurateNowPage = 1;
    //     $scope.accurateDown = function () {
    //         if ($scope.accurateNowPage < $scope.accuratePageTatal) {
    //             $scope.accurateLimit = $scope.accurateLimit + $scope.accurateNumber;
    //             $scope.accurateNowPage = $scope.accurateNowPage + 1;
    //         }
    //     }
    //     $scope.accurateUp = function () {
    //         if ($scope.accurateLimit > 0) {
    //             $scope.accurateLimit = $scope.accurateLimit - $scope.accurateNumber;
    //             $scope.accurateNowPage = $scope.accurateNowPage - 1;
    //         }
    //     }
    //     $scope.accurateFirst = function () {
    //         $scope.accurateNowPage = 1;
    //         $scope.accurateLimit = 0;
    //     }
    //     $scope.accurateLast = function () {
    //         $scope.accurateNowPage = $scope.accuratePageTatal;
    //         $scope.accurateLimit = ($scope.accuratePageTatal - 1) * $scope.accurateNumber;
    //     }
    //     $scope.accuratePageBack = function () {
    //         location.reload();
    //     }
    // })
    //纪律处分
    // .controller('punishController', function ($filter,$state, $scope, $rootScope,$timeout, report) {
    //     $scope.punishStaff = '';
    //     $scope.punishPageLimit = 10;
    //     $scope.punishPageStart = 0;
    //     $scope.punishNowPage = 1;
    //     $scope.punishGet = {
    //         token: report.getUserLogin().token,
    //         staff: $scope.punishStaff,
    //         page: '0',
    //         start: $scope.punishPageStart,
    //         limit: $scope.punishPageLimit
    //     }
    //     $scope.punish = function () {
    //         report.punishList($scope.punishGet).then(function (response) {
    //             console.log(response.data);
    //             $scope.punishPageTotal = response.data.total
    //             $scope.punishContentList = response.data.result;
    //             $scope.punishPage = Math.ceil($scope.punishPageTotal / $scope.punishPageLimit);
    //         })
    //     }
    //     $scope.punish();
    //     //纪律处分页排序
    //     $scope.order=function (a,ord) {
    //         if(ord==1){
    //             $scope.isTrue=false;
    //             $scope.punishContentList=$filter('orderBy')($scope.punishContentList,a,$scope.isTrue);
    //         }else if(ord==-1){
    //             $scope.isTrue=true;
    //             $scope.punishContentList=$filter('orderBy')($scope.punishContentList,a,$scope.isTrue);
    //         }
    //     }
    //     //纪律处分分页
    //     $scope.punishDownPage = function () {
    //         if ($scope.punishPageStart <= ($scope.punishPageTotal - $scope.punishPageLimit)) {
    //             $scope.punishPageStart = $scope.punishPageStart + $scope.punishPageLimit;
    //             $scope.punish();
    //             $scope.punishNowPage = $scope.punishNowPage + 1;
    //         }
    //     }
    //     $scope.punishUpPage = function () {
    //         if ($scope.punishPageStart > 0) {
    //             $scope.punishPageStart = $scope.punishPageStart - $scope.punishPageLimit;
    //             $scope.punish();
    //             $scope.punishNowPage = $scope.punishNowPage - 1;
    //         }
    //     }
    //     $scope.punishFirstPage = function () {
    //         $scope.punishPageStart = 0;
    //         $scope.punish();
    //         $scope.punishNowPage = 1;
    //     }
    //     $scope.punishLastPage = function () {
    //         $scope.punishPageStart = ($scope.punishPage - 1) * $scope.punishPageLimit;
    //         $scope.punish();
    //         $scope.punishNowPage = $scope.punishPage;
    //     }
    //     $scope.punishFind = function () {
    //         $scope.punishGet = {
    //             token: report.getUserLogin().token,
    //             staff: $scope.punishStaff,
    //             page: '0',
    //             start: $scope.punishPageStart,
    //             limit: $scope.punishPageLimit
    //         }
    //         report.punishList($scope.punishGet).then(function (response) {
    //             console.log(response.data);
    //             $scope.punishPageTotal = response.data.total
    //             $scope.punishContentList = response.data.result;
    //             $scope.punishPage = Math.ceil($scope.punishPageTotal / $scope.punishPageLimit);
    //         })
    //     }
    //     //纪律处分查询
    //     $scope.punishAdd = function () {//纪律处分添加
    //         report.accurateArray(report.getUserLogin().token).then(function (response) {
    //             console.log(response);
    //             $scope.punishSelect = response.data.result.children;
    //             $scope.punishSelect.unshift(response.data.result);
    //             console.log($scope.punishSelect);
    //         })
    //         $scope.punishSelectMake = 1;
    //     };
    //     $scope.punishAddStaff = '';
    //     $scope.punishAddMake = function () { //添加确认
    //         $scope.punishAddList = {
    //             token: report.getUserLogin().token,
    //             title: $scope.punishTitle,
    //             content: $scope.punishContent,
    //             staff: $scope.punishAddStaff,
    //             staffOrgId: $scope.punishSelectMake
    //         }
    //         if (!$scope.punishTitle || !$scope.punishContent || !$scope.punishAddStaff) {
    //             swal("内容不能为空!")
    //         } else {
    //             report.punishAddGet($scope.punishAddList).then(function (response) {
    //                 console.log(response);
    //             })
    //             swal("添加成功！", "", "success");
    //             $timeout(function(){
    //                 $scope.punish();
    //             },500);
    //         }
    //     }
    //     //纪律处分修改
    //     $scope.punishRevise = function () {
    //         console.log(this);
    //         console.log(this.punish.id);
    //         $rootScope.punishId = this.punish.id;
    //         report.accurateArray(report.getUserLogin().token).then(function (response) {
    //             console.log(response);
    //             $scope.punishSelect = response.data.result.children;
    //             $scope.punishSelect.unshift(response.data.result);
    //             console.log($scope.punishSelect);
    //         })
    //         //修改里的内容获取
    //         report.punishAllContent(report.getUserLogin().token, $rootScope.punishId).then(function (response) {
    //             console.log(response.data.result);
    //             $scope.punishContent = response.data.result.content;
    //             $scope.punishTitle = response.data.result.title;
    //             $scope.punishStaff = response.data.result.staff;
    //             $scope.punishSelectMake = response.data.result.staffOrg.id;
    //             console.log($scope.punishContent);
    //         })
    //         //修改确定
    //         $scope.punishMake = function () {
    //             punishUpDateList = {
    //                 token: report.getUserLogin().token,
    //                 id: $rootScope.punishId,
    //                 title: $scope.punishTitle,
    //                 content: $scope.punishContent,
    //                 staff: $scope.punishStaff,
    //                 staffOrgId: $scope.punishSelectMake
    //             };
    //             console.log(punishUpDateList);
    //             report.punishUpDate(punishUpDateList).then(function (response) {
    //                 // console.log(response);
    //             });
    //             swal("修改成功！", "", "success");
    //             $timeout(function(){
    //                 $scope.punish();
    //             },500);
    //         }
    //     }
    //     $scope.punishDelBut = function () {//记录删除处分按钮
    //         console.log(this.punish.id);
    //         $scope.punishId = this.punish.id;
    //         $scope.punishDelete = function () {  //纪律处分删除
    //             report.punishDelete(report.getUserLogin().token, $scope.punishId).then(function (response) {
    //                 // console.log(response);
    //             });
    //             swal("删除成功！", "", "success");
    //             $scope.punish();
    //         }
    //     }
    // })
    //统计图表
    // .controller('dataController', function ($filter, $state, $scope, $rootScope, report) {
    //     $scope.dataList = {   //统计接口参数
    //         token: report.getUserLogin().token,
    //         eventCreateTimeFrom: '',
    //         eventCreateTimeTo: '',
    //         eventTimeFrom: '',
    //         eventTimeTo: ''
    //     }
    //     //统计库
    //     $scope.tab = function (dataTypeList, dataType1List, dataType2List) {
    //         var myChart = echarts.init(document.getElementById('main'));
    //         option = {
    //             tooltip: {
    //                 trigger: 'axis',
    //                 axisPointer: {
    //                     type: 'cross',
    //                     crossStyle: {
    //                         color: '#999'
    //                     }
    //                 }
    //             },
    //             toolbox: {
    //                 feature: {
    //                     dataView: {show: true, readOnly: false},
    //                     magicType: {show: true, type: ['line', 'bar']},
    //                     restore: {show: true},
    //                     saveAsImage: {show: true}
    //                 }
    //             },
    //             legend: {
    //                 data: ['婚嫁', '丧葬', '平均次数']
    //             },
    //             xAxis: [
    //                 {
    //                     type: 'category',
    //                     data: dataTypeList,
    //                     axisPointer: {
    //                         type: 'shadow'
    //                     }
    //                 }
    //             ],
    //             yAxis: [
    //                 {
    //                     type: 'value',
    //                     name: '次数',
    //                     min: 0,
    //                     max: 2000,
    //                     interval: 250,
    //                     axisLabel: {
    //                         formatter: '{value} '
    //                     }
    //                 },
    //             ],
    //             series: [
    //                 {
    //                     name: '婚嫁',
    //                     type: 'bar',
    //                     data: dataType1List
    //                 },
    //                 {
    //                     name: '丧葬',
    //                     type: 'bar',
    //                     data: dataType2List
    //                 },
    //
    //             ]
    //         };
    //         myChart.setOption(option);
    //     }
    //
    //     //统计查询
    //     $scope.dataQuery = function () {
    //         $scope.dataTypeList = [];
    //         $scope.dataType1List = [];
    //         $scope.dataType2List = [];
    //         $scope.dataList.eventCreateTimeFrom = $filter('date')($scope.createTimeFrom, 'yyyy-MM-dd');
    //         $scope.dataList.eventCreateTimeTo = $filter('date')($scope.createTimeTo, 'yyyy-MM-dd');
    //         $scope.dataList.eventTimeFrom = $filter('date')($scope.timeFrom, 'yyyy-MM-dd');
    //         $scope.dataList.eventTimeTo = $filter('date')($scope.timeTo, 'yyyy-MM-dd');
    //         //图表
    //         report.dataGet($scope.dataList).then(function (response) {
    //             // console.log(response.data.result);
    //             var i = 0;
    //             while (i < response.data.result.length) {
    //                 $scope.dataTypeList.push(response.data.result[i].orgName);
    //                 $scope.dataType1List.push(response.data.result[i].type1Count);
    //                 $scope.dataType2List.push(response.data.result[i].type2Count);
    //                 i++;
    //             }
    //             $scope.tab($scope.dataTypeList, $scope.dataType1List, $scope.dataType2List);
    //         })
    //     };
    //     $scope.dataQuery();//统计查询
    // })
    // //公开通报
    // .controller('notificationController', function ($filter,$scope, $rootScope, report) {     //审批界面
    //     $scope.o = {                                                                            //查询输入的参数
    //         token: report.getUserLogin().token,//令牌
    //         staff: '',//申报人
    //         page: 1,
    //         start: 0,//从第几个开始9
    //         limit: 9//每页显示多少个9
    //     };
    //     $scope.addO = {
    //         token: report.getUserLogin().token,//令牌
    //         title: '',
    //         content: '',
    //         staff: '',
    //         staffOrgId: 1
    //     };
    //     $scope.getNotificationInfo = {
    //         token: report.getUserLogin().token,//令牌
    //         id: '',
    //         title: '',
    //         content: '',
    //         staff: '',
    //         staffOrgId: ''
    //     };
    //     $scope.getNotificationArr=function (v) {         // //审批--查询界面                              //获取数据的方法
    //         report.notificationList(v).then(function (d) {
    //             // console.log(d.data.result);
    //             if (!d.data.result.length) {
    //                 swal("查询信息不存在", "请重新输入");
    //             } else {
    //                 $scope.arr = d.data.result;
    //                 $scope.total = d.data.total;
    //                 $scope.pageSum = Math.ceil($scope.total / $scope.o.limit);
    //             }
    //         }, function (d) {
    //             console.log(d)
    //         });
    //     }
    //     //公开通报页排序
    //     $scope.order=function (a,ord) {
    //         if(ord==1){
    //             $scope.isTrue=false;
    //             $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
    //         }else if(ord==-1){
    //             $scope.isTrue=true;
    //             $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
    //         }
    //     }
    //     $scope.getOrgIdArr=function (v, index) {         // 获取所有的staffOrgId
    //         report.getOrgId(v).then(function (d) {
    //             console.log(d.data.result);
    //             $scope.orgIdArr = d.data.result.children;
    //             $scope.orgIdArr.unshift({'father': 'father', 'id': d.data.result.id, 'name': d.data.result.name});
    //             if (index) {
    //                 $scope.orgIdArr.some(function (v, i, a) {
    //                     $scope.getOrgIdArrIndex = i;
    //                     return v.id == index
    //                 })
    //             } else {
    //                 $scope.getOrgIdArrIndex = index;
    //             }
    //             $scope.orgIdOptions = $scope.orgIdArr[$scope.getOrgIdArrIndex];
    //
    //         }, function (d) {
    //             console.log(d)
    //         });
    //     }
    //     $scope.notificationAdd=function (v) {         // 添加Notification
    //         report.notificationAdd(v).then(function (d) {
    //             console.log(d.data.result);
    //         }, function (d) {
    //             console.log(d)
    //         });
    //     }
    //     $scope.notificationDel=function (v) {
    //         report.notificationDel(v).then(function (d) {
    //             console.log(d.data.result);
    //         }, function (d) {
    //             console.log(d)
    //         });
    //     }
    //     $scope.getNotification=function (v) {         // 获取公开通报后台信息
    //         report.getNotification(v).then(function (d) {
    //             $scope.getNotificationInfo.content = d.data.result.content;
    //             $scope.getNotificationInfo.staff = d.data.result.staff;
    //             $scope.getNotificationInfo.title = d.data.result.title;
    //             $scope.getNotificationInfo.staffOrgId = d.data.result.staffOrg.id;
    //             $scope.getOrgIdArr($scope.o.token, $scope.getNotificationInfo.staffOrgId);
    //         }, function (d) {
    //             console.log(d)
    //         });
    //     }
    //     $scope.updateNotification=function (v) {         // 更新公开通报后台信息
    //         report.updateNotification(v).then(function (d) {
    //         }, function (d) {
    //             console.log(d)
    //         });
    //     }
    //     $scope.orgIdSelect = function (v) {//获取staffOrgId
    //         console.log(v.id);
    //         $scope.addO.staffOrgId = v.id;
    //         $scope.getNotificationInfo.staffOrgId = v.id;
    //     }
    //     $scope.getNotificationArr($scope.o);//获取数据
    //     $scope.search = function () {
    //         $scope.o.page = '1';
    //         $scope.o.start = '0';
    //         $scope.getNotificationArr($scope.o);
    //     }
    //     $scope.add = function () {//查询的按钮
    //         $scope.getOrgIdArr($scope.o.token, 0);
    //     }
    //     $scope.addOk = function () {
    //         $scope.notificationAdd($scope.addO);
    //         setTimeout(function(){
    //             $scope.o.page = '1';
    //             $scope.o.start = '0';
    //             $scope.getNotificationArr($scope.o);
    //         },200)
    //     }
    //     $scope.update = function (v) {
    //         $scope.getNotificationInfo.id = v;
    //         $scope.getNotification({token: $scope.o.token, id: v});
    //     }
    //     $scope.updateOK = function () {
    //         $scope.updateNotification($scope.getNotificationInfo);
    //         setTimeout(function(){
    //             $scope.o.page = '1';
    //             $scope.o.start = '0';
    //             $scope.getNotificationArr($scope.o);
    //         },200)
    //     }
    //     $scope.del = function (v) {
    //         $scope.notificationDel({token: $scope.o.token, id: v});
    //         setTimeout(function(){
    //             $scope.o.page = '1';
    //             $scope.o.start = '0';
    //             $scope.getNotificationArr($scope.o);
    //         },200)
    //         swal("删除成功", "请重新输入", "success");
    //     }
    //     $scope.firstPage = function () {
    //         $scope.o.page = '1';
    //         $scope.o.start = '0';
    //         $scope.getNotificationArr($scope.o);
    //     };
    //     $scope.prePage = function () {
    //         if ($scope.o.page > 1) {
    //             $scope.o.page--;
    //             $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
    //             $scope.getNotificationArr($scope.o);
    //         }
    //     };
    //     $scope.nextPage = function () {
    //         if ($scope.o.page < $scope.pageSum) {
    //             $scope.o.page++;
    //             $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
    //             $scope.getNotificationArr($scope.o);
    //         }
    //     };
    //     $scope.lastPage = function () {
    //         $scope.o.page = $scope.pageSum;
    //         $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
    //         console.log($scope.o.start);
    //         $scope.getNotificationArr($scope.o);
    //     };
    //     $scope.refreshPage = function () {
    //         $scope.o.page = '1';
    //         $scope.o.start = '0';
    //         $scope.getNotificationArr($scope.o);
    //     };
    // })
    // //组合查询
    // .controller('combinationController', function ($scope, $rootScope, report, $filter) {
    //     $scope.o = {
    //         token: report.getUserLogin().token,//令牌
    //         eventType: 0,
    //         peopleCountMin: 0,
    //         peopleCountMax: 0,
    //         eventCreateTimeFrom: '',
    //         eventCreateTimeTo: '',
    //         eventTimeFrom: '',
    //         eventTimeTo: '',
    //         page: 1,
    //         start: 0,
    //         limit: 9//每页显示多少个
    //     };
    //     $scope.eventTypeO = [{'i': 0, 'v': '全部'}, {'i': 1, 'v': '婚嫁'}, {'i': 2, 'v': '丧葬'}];
    //     $scope.peopleCountO = [{'i': 0, 'v': '全部'}, {'i': 1, 'v': '0-50人'}, {'i': 2, 'v': '50-100人'}, {
    //         'i': 3,
    //         'v': '100-150人'
    //     }, {'i': 4, 'v': '150-200人'}];
    //     $scope.eventTypeDefault = $scope.eventTypeO[0];
    //     $scope.peopleCountDefault = $scope.peopleCountO[0];
    //     $scope.eventType = function (o) {
    //         console.log(o.i);
    //         $scope.o.eventType = o.i;
    //     };
    //     $scope.peopleCount = function (o) {
    //         console.log(o.i);
    //         $scope.o.peopleCountMax = o.i * 50;
    //         if (o.i > 0) {
    //             $scope.o.peopleCountMin = $scope.o.peopleCountMax - 50;
    //         } else {
    //             $scope.o.peopleCountMin = 0;
    //         }
    //         console.log($scope.o);
    //     };
    //     $scope.total=0;
    //     $scope.pageSum=0;
    //     $scope.getCombinationArr=function (v){
    //         report.combination(v).then(function(d){
    //             $scope.initArr = d.data.result;
    //             $scope.arr = $filter('limitTo')($scope.initArr, '9', '0');
    //             $scope.total = d.data.total;
    //             $scope.pageSum = Math.ceil($scope.total / 9);
    //         }, function (d) {
    //             console.log(d)
    //         });
    //     }
    //     //组合查询页排序
    //     $scope.order=function (a,ord) {
    //         if(ord==1){
    //             $scope.isTrue=false;
    //             $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
    //         }else if(ord==-1){
    //             $scope.isTrue=true;
    //             $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
    //         }
    //     }
    //     $scope.combinationSearch = function () {
    //         $scope.o.eventCreateTimeFrom = $filter('date')($scope.createTimeFrom, 'yyyy-MM-dd');
    //         $scope.o.eventCreateTimeTo = $filter('date')($scope.createTimeTo, 'yyyy-MM-dd');
    //         $scope.o.eventTimeFrom = $filter('date')($scope.timeFrom, 'yyyy-MM-dd');
    //         $scope.o.eventTimeTo = $filter('date')($scope.timeTo, 'yyyy-MM-dd');
    //         $scope.getCombinationArr($scope.o);
    //     }
    //     $scope.currentPageNum = 1;
    //     $scope.firstPage = function () {
    //         $scope.currentPageNum = 1;
    //         $scope.arr = $filter('limitTo')($scope.initArr, '9', ($scope.currentPageNum - 1) * 9);
    //     };
    //     $scope.prePage = function () {
    //         if ($scope.currentPageNum > 1) {
    //             $scope.currentPageNum--;
    //             $scope.arr = $filter('limitTo')($scope.initArr, '9', ($scope.currentPageNum - 1) * 9);
    //         }
    //     };
    //     $scope.nextPage = function () {
    //         console.log(234);
    //         console.log($scope.currentPageNum);
    //         console.log($scope.pageSum);
    //         if ($scope.currentPageNum < $scope.pageSum) {
    //             $scope.currentPageNum++;
    //             console.log($scope.currentPageNum);
    //             $scope.arr = $filter('limitTo')($scope.initArr, '9', ($scope.currentPageNum - 1) * 9);
    //             console.log($scope.arr);
    //         }
    //     };
    //     $scope.lastPage = function () {
    //         $scope.currentPageNum = $scope.pageSum;
    //         $scope.arr = $filter('limitTo')($scope.initArr, '9', ($scope.currentPageNum - 1) * 9);
    //     };
    //     $scope.refreshPage = function () {
    //         $scope.currentPageNum = 1;
    //         $scope.arr = $filter('limitTo')($scope.initArr, '9', ($scope.currentPageNum - 1) * 9);
    //     };
    // })
    // 用户管理
    // .controller('userManageController', function ($filter,$scope, report) {
    //
    //     //用户管理页排序
    //     $scope.order=function (a,ord) {
    //         if(ord==1){
    //
    //             $scope.isTrue=false;
    //             $scope.userManage=$filter('orderBy')($scope.userManage,a,$scope.isTrue);
    //         }else if(ord==-1){
    //             $scope.isTrue=true;
    //             $scope.userManage=$filter('orderBy')($scope.userManage,a,$scope.isTrue);
    //         }
    //     }
    //
    //
    //     //用户管理数据
    //     $scope.dataList=9;
    //     $scope.userPageNow=1;
    //     $scope.userPageStart=1;
    //
    //     $scope.refresh=function () {
    //         report.userManageData({
    //             token: report.getUserLogin().token,
    //             page: 0,
    //             start: $scope.userPageStart,
    //             limit: $scope.dataList
    //
    //         }).then(function (data) {
    //             // console.log(data);
    //             $scope.userTotal=data.data.total;
    //             $scope.userManage = data.data.result;
    //             // console.log($scope.userTotal);
    //             $scope.userPageTotal=Math.ceil($scope.userTotal/$scope.dataList);
    //         }, function (error) {
    //             console.log(error);
    //         })
    //     }
    //     $scope.refresh();
    //
    //
    //     //首页
    //     $scope.accurateFirst=function () {
    //         $scope.userPageNow=1;
    //         $scope.userPageStart=1;
    //         $scope.refresh();
    //     }
    //
    //     //下一页
    //     $scope.accurateDown=function () {
    //
    //         if($scope.userPageNow<$scope.userPageTotal){
    //             $scope.userPageNow++;
    //             $scope.userPageStart=$scope.userPageStart+$scope.dataList;
    //             $scope.refresh();
    //         }
    //
    //     }
    //
    //     //上一页
    //     $scope.accurateUp=function () {
    //         if($scope.userPageNow>1){
    //             $scope.userPageNow--;
    //             $scope.userPageStart=$scope.userPageStart-$scope.dataList;
    //             $scope.refresh();
    //         }
    //
    //     }
    //
    //     //最后一页
    //     $scope.accurateLast=function () {
    //         $scope.userPageNow=$scope.userPageTotal;
    //         $scope.userPageStart=($scope.userPageTotal-1)*$scope.dataList;
    //         $scope.refresh();
    //     }
    //
    //     //刷新
    //     $scope.accuratePageBack=function () {
    //         $scope.refresh();
    //     }
    //
    //
    //
    //
    //     // 点击修改
    //     $scope.modify = function () {
    //         console.log(this);
    //         $scope.userId = this.user.id;
    //         $scope.dataModifyList = {
    //             token: report.getUserLogin().token,
    //             userId: this.user.id,
    //             orgId: 1,
    //             roleId: '',
    //             name: '',
    //             password: ''
    //         }
    //         //获取当前部门数据
    //         report.currentDepartment({
    //             token: report.getUserLogin().token
    //         }).then(function (data) {
    //             $scope.department = data.data.result.children.unshift(data.data.result);
    //             $scope.department = data.data.result.children;
    //             console.log($scope.department);
    //         }, function (error) {
    //         })
    //         //获取用户角色数据
    //         report.userRole({
    //             token: report.getUserLogin().token,
    //             roleId: this.user.id
    //         }).then(function (data) {
    //             $scope.roles = data.data.result;
    //             console.log($scope.roles)
    //         }, function (error) {
    //         })
    //         //
    //         report.userId({
    //             token: report.getUserLogin().token,
    //             userId: this.user.id
    //         }).then(function (data) {
    //             // console.log(data.data.result);
    //             $scope.dataModifyList.name = data.data.result.name;
    //             $scope.dataModifyList.username = data.data.result.username;
    //             $scope.dataModifyList.orgId = data.data.result.organization.id;
    //             $scope.dataModifyList.roleId = data.data.result.role.id;
    //             console.log($scope.dataModifyList.roleId);
    //         }, function (error) {
    //             console.log(error);
    //         })
    //     }
    //     // 确定修改数据
    //     $scope.sureModify = function () {
    //         console.log($scope.dataModifyList);
    //         report.sureModifyData($scope.dataModifyList).then(
    //             function (data) {
    //                 // console.log(data);
    //                 $scope.refresh();
    //                 swal("修改成功!", "", "success");
    //             }, function (error) {
    //                 console.log(error);
    //                 swal("修改失败!", "", "error");
    //             })
    //     };
    //     // 删除用户信息
    //     $scope.sureDelete = function () {
    //         // console.log(this);
    //         var data = {
    //             token: report.getUserLogin().token,
    //             id: this.user.id
    //         }
    //         report.deleteUserInformation(data).then(
    //             function (data) {
    //                 console.log(data)
    //                 swal("删除成功!", "", "success");
    //                 $scope.refresh();
    //             }, function (error) {
    //                 console.log(error)
    //                 swal("删除失败!", "", "error");
    //             })
    //     };
    //     // 点击新增用户
    //     $scope.newAdd=function () {
    //
    //         $scope.addData = {
    //             token: report.getUserLogin().token,
    //             orgId:1,
    //             username:'',
    //             name:'',
    //             password:'',
    //             roleId:''
    //         }
    //         $scope.addData.username='';
    //         $scope.addData.name='';
    //         $scope.addData.password='';
    //         $scope.addData.orgId=1;
    //         $scope.addData.roleId='';
    //         $scope.surePassword='';
    //         //获取当前部门数据
    //         report.currentDepartment({
    //             token: report.getUserLogin().token
    //         }).then(function (data) {
    //             // console.log(data)
    //             $scope.department = data.data.result.children.unshift(data.data.result);
    //             $scope.department = data.data.result.children;
    //         }, function (error) {
    //
    //         });
    //         //获取用户角色数据
    //         report.userRole({
    //             token: report.getUserLogin().token,
    //             roleId: 0
    //         }).then(function (data) {
    //             // console.log(data)
    //             $scope.roles = data.data.result;
    //         }, function (error) {
    //
    //         })
    //     }
    //     // 确认增加用户
    //     $scope.sureAdd=function () {
    //         report.addUser($scope.addData ).then
    //         (function (data) {
    //             // console.log(data);
    //             $('#myModal').modal('hide');
    //             swal("添加成功!", "", "success");
    //             $scope.addUserModal.$submitted=false;
    //             $scope.refresh();
    //         },function (error) {
    //             // console.log(error)
    //             swal("添加失败!", "", "error");
    //         })
    //     }
    //
    //     // 分页
    //
    //
    // })
    //角色管理
    // .controller('roleController',function ($scope,$rootScope,report,$filter) {
    //     $scope.o={
    //         token:report.getUserLogin().token,//令牌
    //         page:1,
    //         start:0,
    //         limit:9//每页显示多少个
    //     };
    //     $scope.getO={
    //         token:report.getUserLogin().token,//令牌
    //         roleId:''
    //     };
    //     $scope.deleteO={
    //         token:report.getUserLogin().token,//令牌
    //         id:'',
    //     }
    //     $scope.getRoleArr=function (v){
    //         report.roleShow(v).then(function(d){
    //             console.log(d);
    //             $scope.arr=d.data.result;
    //             $scope.total=d.data.total;
    //             $scope.pageSum=Math.ceil($scope.total/$scope.o.limit);
    //         },function(d){
    //             console.log(d)
    //         });
    //     }
    //
    //
    //     //角色管理页排序
    //     $scope.order=function (a,ord) {
    //         if(ord==1){
    //
    //             $scope.isTrue=false;
    //             $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
    //         }else if(ord==-1){
    //             $scope.isTrue=true;
    //             $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
    //         }
    //     }
    //
    //
    //
    //     $scope.getRoleArr($scope.o);
    //     $scope.getRoleInfo=function (v){
    //
    //         report.getRole(v).then(function(d){
    //             console.log(d)
    //             $scope.modelCurrentRoleName=d.data.result.name;
    //             $scope.modelCurrentRoleId=d.data.result.id;
    //             $scope.modelCurrentArr=d.data.result.functions;
    //             $scope.modelArr=report.getUserLogin().user.role.functions;
    //             $scope.modelArr.forEach(function(v){
    //                 v.isSelect = $scope.modelCurrentArr.some(function (Cv) {
    //                     return v.code==Cv.code
    //                 })
    //             });
    //         },function(d){
    //             console.log(d)
    //         });
    //     }
    //     $scope.addRoleInfo=function (v){
    //         report.addRole(v).then(function(d){
    //             console.log(d);
    //         },function(d){
    //             console.log(d)
    //         });
    //     }
    //     $scope.addContent=function(){
    //         $scope.modelAddRoleName='';
    //         $scope.modelArr=report.getUserLogin().user.role.functions;
    //         console.log(report.getUserLogin());
    //     }
    //     $scope.submitContent=function(){
    //         $scope.updateStr='';
    //         $scope.modelArr.forEach(function (v) {
    //             if(v.isSelect){
    //                 $scope.updateStr=$scope.updateStr+'&functionCodes='+v.code
    //             }
    //         });
    //         $scope.updateStr='?token='+$scope.getO.token+'&roleName='+$scope.modelAddRoleName+$scope.updateStr;
    //         console.log($scope.updateStr);
    //         $scope.addRoleInfo($scope.updateStr);
    //         setTimeout(function(){
    //             $scope.getRoleArr($scope.o);
    //         },200)
    //     }
    //     $scope.showContent=function(id){
    //         $scope.getO.roleId=id;
    //         $scope.getRoleInfo($scope.getO);
    //     }
    //     $scope.updateRoleInfo=function (v){
    //         report.updateRole(v).then(function(d){
    //             console.log(d)
    //         },function(d){
    //             console.log(d)
    //         });
    //     }
    //     $scope.getDeleteRole=function (v){
    //         report.deleteRole(v).then(function(d){
    //             console.log(d)
    //         },function(d){
    //             console.log(d)
    //         });
    //     }
    //     $scope.deleteRole=function(id){
    //         $scope.deleteO.id=id;
    //         $scope.getDeleteRole($scope.deleteO);
    //         setTimeout(function(){
    //             $scope.getRoleArr($scope.o);
    //         },200)
    //     }
    //     $scope.updateContent=function(){
    //         $scope.updateStr='';
    //         $scope.modelArr.forEach(function (v) {
    //             if(v.isSelect){
    //                 $scope.updateStr=$scope.updateStr+'&functionCodes='+v.code
    //             }
    //         })
    //         $scope.updateStr='?token='+$scope.getO.token+'&roleId='+$scope.modelCurrentRoleId+'&roleName='+$scope.modelCurrentRoleName+$scope.updateStr
    //         // console.log($scope.updateStr);
    //         $scope.updateRoleInfo($scope.updateStr);
    //         setTimeout(function(){
    //             $scope.getRoleArr($scope.o);
    //         },200)
    //     }
    //     $scope.firstPage=function(){
    //         $scope.o.page='1';
    //         $scope.o.start='0';
    //         $scope.getRoleArr($scope.o);
    //     };
    //     $scope.prePage=function(){
    //         if($scope.o.page>1){
    //             $scope.o.page--;
    //             $scope.o.start=($scope.o.page-1)*$scope.o.limit;
    //             $scope.getRoleArr($scope.o);
    //         }
    //     };
    //     $scope.nextPage=function(){
    //         if($scope.o.page<$scope.pageSum){
    //             $scope.o.page++;
    //             $scope.o.start=($scope.o.page-1)*$scope.o.limit;
    //             $scope.getRoleArr($scope.o);
    //         }
    //     };
    //     $scope.lastPage=function(){
    //         $scope.o.page=$scope.pageSum;
    //         $scope.o.start=($scope.o.page-1)*$scope.o.limit;
    //         $scope.getRoleArr($scope.o);
    //     };
    //     $scope.refreshPage=function(){
    //         $scope.o.page='1';
    //         $scope.o.start='0';
    //         $scope.getRoleArr($scope.o);
    //     };
    // })



