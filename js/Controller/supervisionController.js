/**
 * Created by LiuQiang on 2017/4/9.
 */
angular.module('myApp.controller')
.controller('supervisionController', ['$filter','$state', '$scope', '$rootScope', 'report',function ($filter,$state, $scope, $rootScope, report) {
    //状态多选表单----1.对象;2.初始值;3.选框change事件
    $scope.auditArr = [{'i': '-1', 'v': '未监督'}, {'i': '1', 'v': '已监督'}];
    $scope.audit = $scope.auditArr[0];
    $scope.auditMake = function (o) {
        $scope.o.superviseStatus = o.i;
    };
    //现场监督页排序
    $scope.order=function (a,ord) {
        if(ord==1){
            $scope.isTrue=false;
            $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
        }else if(ord==-1){
            $scope.isTrue=true;
            $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
        }
    }
    //现场监督查询输入的参数
    $scope.o = {
        token: report.getUserLogin().token,
        staff: '',
        superviseStatus: -1,  //-1为未公;1未公示
        page: 1,//当前页数
        start: 0,//从第几个开始
        limit: 9//每页显示多少个
    };
    //调接口查询获取数组
    $scope.getSupervisionArr=function (v) {
        report.supervisionSearch(v).then(function (d) {
            if (!d.data.result.length) {
                swal("查询信息不存在", "请重新输入");
            } else {
                $scope.arr = d.data.result;
                if($scope.o.superviseStatus==-1){
                    $scope.total = d.data.total-725;
                }else{
                    $scope.total = d.data.total-59;
                }
                $scope.pageSum = Math.ceil($scope.total / $scope.o.limit);
            }
        }, function (d) {
            console.log(d)
        });
    }
    //初始显示
    $scope.getSupervisionArr($scope.o);
    $scope.search = function () {                                                   //查询的按钮
        $scope.o.page = '1';
        $scope.o.start = '0';
        $scope.o.staff = $scope.staff;
        $scope.getSupervisionArr($scope.o);
    };
    $scope.firstPage = function () {
        $scope.o.page = '1';
        $scope.o.start = '0';
        $scope.getSupervisionArr($scope.o);
    };
    $scope.prePage = function () {
        if ($scope.o.page > 1) {
            $scope.o.page--;
            $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
            $scope.getSupervisionArr($scope.o);
        }
    };
    $scope.nextPage = function () {
        if ($scope.o.page < $scope.pageSum) {
            $scope.o.page++;
            $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
            $scope.getSupervisionArr($scope.o);
        }
    };
    $scope.lastPage = function () {
        $scope.o.page = $scope.pageSum;
        $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
        console.log($scope.o.start);
        $scope.getSupervisionArr($scope.o);
    };
    $scope.refreshPage = function () {
        $scope.o.page = '1';
        $scope.o.start = '0';
        $scope.getSupervisionArr($scope.o);
    };
    $scope.MakeO = {
        token: report.getUserLogin().token,//令牌
        eventId: ''//待审批项目id
    };
    $scope.MakeTitleOKO = {
        token: report.getUserLogin().token,//令牌
        eventId: '',//待审批项目id
        title: '',//审核状态 1：通过 2：拒绝
        content: ''//审批意见内容
    };
    $scope.MakeTitleNOO = {
        token: report.getUserLogin().token,//令牌
        eventId: '',//待审批项目id
        isCashGiftOutOfLimits: 0,
        isUsePublicCar: 0,
        isUsePublicGoods: 0,
        isUsePublicAsserts: 0,
        isUsePublicMoney: 0,
        attachmentFileCode: '',
        otherQuestion: '',
        content: ''//审批意见内容
    };
    $scope.getId = function (id) {
        $scope.MakeO.eventId = id;
        $scope.MakeTitleOKO.eventId = id;
        $scope.MakeTitleNOO.eventId = id;
    }
    $scope.makeOk = function () {
        // 调同意和拒绝的接口


        report.supervisionMakeOk($scope.MakeO);
        report.supervisionMakeTitleOk($scope.MakeTitleOKO);
        console.log(123);
        swal("报告填写完成!", "success");
        //获取数据
        setTimeout(function(){
            $scope.getSupervisionArr($scope.o);
        },200)
    };
    $scope.makeNO = function () {
        // 调同意和拒绝的接口
        report.supervisionMakeNO($scope.MakeO);
        report.supervisionMakeTitleNO($scope.MakeTitleOKO);
        swal("违纪登记完成!", "success");
        //获取数据
        setTimeout(function(){
            $scope.getSupervisionArr($scope.o);
        },200)
    };
}])