/**
 * Created by LiuQiang on 2017/4/9.
 */

angular.module('myApp.controller')
.controller('approvalController', ['$filter','$scope', '$rootScope', 'report',function ($filter,$scope, $rootScope, report) {
    //审批查询输入的参数
    $scope.o = {
        token: report.getUserLogin().token,
        staff: '',
        auditStatus: -1,
        page: 1,
        start: 0,
        limit: 9
    };
    //审批状态多选表单--1.对象;2.初始值;3.选框change事件
    $scope.auditArr = [{'i': '-1', 'v': '待审核'}, {'i': '1', 'v': '通过'}, {'i': '2', 'v': '拒绝'}];
    $scope.audit = $scope.auditArr[0];
    $scope.auditMake = function (o) {
        $scope.o.auditStatus = o.i;
    };

    $scope.order=function (a,ord) {
        if(ord==1){
            $scope.isTrue=false;
            $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
        }else if(ord==-1){
            $scope.isTrue=true;
            $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
        }
    }


    //调接口查询获取数组
    $scope.getApprovalArr=function (v) {
        report.approvalSearch(v).then(function (d) {
            if (!d.data.result.length) {
                swal("查询信息不存在", "请重新输入");
            } else {
                $scope.arr = d.data.result;
                $scope.total = d.data.total-14;
                $scope.pageSum = Math.ceil($scope.total / $scope.o.limit);
            }
        }, function (d) {
            console.log(d)
        });
    }
    //初始显示
    $scope.getApprovalArr($scope.o);
    //查询点击事件
    $scope.search = function () {
        $scope.o.page = '1';
        $scope.o.start = '0';
        $scope.o.staff = $scope.staff;
        $scope.getApprovalArr($scope.o);
    };
    //首页
    $scope.firstPage = function () {
        $scope.o.page = '1';
        $scope.o.start = '0';
        $scope.getApprovalArr($scope.o);
    };
    //上一页
    $scope.prePage = function () {
        if ($scope.o.page > 1) {
            $scope.o.page--;
            $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
            $scope.getApprovalArr($scope.o);
        }
    };
    //下一页
    $scope.nextPage = function () {
        if ($scope.o.page < $scope.pageSum) {
            $scope.o.page++;
            $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
            $scope.getApprovalArr($scope.o);
        }
    };
    //尾页
    $scope.lastPage = function () {
        $scope.o.page = $scope.pageSum;
        $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
        $scope.getApprovalArr($scope.o);
    };
    //刷新
    $scope.refreshPage = function () {
        $scope.o.page = '1';
        $scope.o.start = '0';
        $scope.getApprovalArr($scope.o);
    };
    $scope.approvalMakeO = {
        token: report.getUserLogin().token,//令牌
        eventId: '',
        status: '',
        content: ''
    };
    $scope.approvalMake = function (t, id) {
        $scope.approvalMakeO.eventId = id;
        $scope.approvalMakeO.status = t;
        swal({
                title: "意见",
                text: "请填写审批意见！",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
            },
            function (inputValue) {
                if (inputValue === false) return false;
                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false
                }
                $scope.approvalMakeO.content = inputValue;
                swal("审评成功!", "You wrote: " + inputValue, "success");
                // 调同意和拒绝的接口
                report.approvalMake($scope.approvalMakeO);
            });
        //重新获取数据
        setTimeout(function (){$scope.getApprovalArr($scope.o)},200)
    };
}])