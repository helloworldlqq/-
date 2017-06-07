/**
 * Created by LiuQiang on 2017/4/9.
 */
angular.module('myApp.controller')
.controller('punishController', ['$filter','$state', '$scope', '$rootScope','$timeout', 'report',function ($filter,$state, $scope, $rootScope,$timeout, report) {
    $scope.punishStaff = '';
    $scope.punishPageLimit = 10;
    $scope.punishPageStart = 0;
    $scope.punishNowPage = 1;
    $scope.punishGet = {
        token: report.getUserLogin().token,
        staff: $scope.punishStaff,
        page: '0',
        start: $scope.punishPageStart,
        limit: $scope.punishPageLimit
    }
    $scope.punish = function () {
        report.punishList($scope.punishGet).then(function (response) {
            console.log(response.data);
            $scope.punishPageTotal = response.data.total
            $scope.punishContentList = response.data.result;
            $scope.punishPage = Math.ceil($scope.punishPageTotal / $scope.punishPageLimit);
        })
    }
    $scope.punish();
    //纪律处分页排序
    $scope.order=function (a,ord) {
        if(ord==1){
            $scope.isTrue=false;
            $scope.punishContentList=$filter('orderBy')($scope.punishContentList,a,$scope.isTrue);
        }else if(ord==-1){
            $scope.isTrue=true;
            $scope.punishContentList=$filter('orderBy')($scope.punishContentList,a,$scope.isTrue);
        }
    }
    //纪律处分分页
    $scope.punishDownPage = function () {
        if ($scope.punishPageStart <= ($scope.punishPageTotal - $scope.punishPageLimit)) {
            $scope.punishPageStart = $scope.punishPageStart + $scope.punishPageLimit;
            $scope.punish();
            $scope.punishNowPage = $scope.punishNowPage + 1;
        }
    }
    $scope.punishUpPage = function () {
        if ($scope.punishPageStart > 0) {
            $scope.punishPageStart = $scope.punishPageStart - $scope.punishPageLimit;
            $scope.punish();
            $scope.punishNowPage = $scope.punishNowPage - 1;
        }
    }
    $scope.punishFirstPage = function () {
        $scope.punishPageStart = 0;
        $scope.punish();
        $scope.punishNowPage = 1;
    }
    $scope.punishLastPage = function () {
        $scope.punishPageStart = ($scope.punishPage - 1) * $scope.punishPageLimit;
        $scope.punish();
        $scope.punishNowPage = $scope.punishPage;
    }
    $scope.punishFind = function () {
        $scope.punishGet = {
            token: report.getUserLogin().token,
            staff: $scope.punishStaff,
            page: '0',
            start: $scope.punishPageStart,
            limit: $scope.punishPageLimit
        }
        report.punishList($scope.punishGet).then(function (response) {
            console.log(response.data);
            $scope.punishPageTotal = response.data.total
            $scope.punishContentList = response.data.result;
            $scope.punishPage = Math.ceil($scope.punishPageTotal / $scope.punishPageLimit);
        })
    }
    //纪律处分查询
    $scope.punishAdd = function () {//纪律处分添加
        report.accurateArray(report.getUserLogin().token).then(function (response) {
            console.log(response);
            $scope.punishSelect = response.data.result.children;
            $scope.punishSelect.unshift(response.data.result);
            console.log($scope.punishSelect);
        })
        $scope.punishSelectMake = 1;
    };
    $scope.punishAddStaff = '';
    $scope.punishAddMake = function () { //添加确认
        $scope.punishAddList = {
            token: report.getUserLogin().token,
            title: $scope.punishTitle,
            content: $scope.punishContent,
            staff: $scope.punishAddStaff,
            staffOrgId: $scope.punishSelectMake
        }

            report.punishAddGet($scope.punishAddList).then(function (response) {
                console.log(response);
                $scope.punishAddStaff = '';
                $scope.punishTitle='';
                $scope.punishContent='';
                $scope.addForm.$submitted=false;

            })
            swal("添加成功！", "", "success");
            $timeout(function(){
                $scope.punish();
            },500);

    }
    //纪律处分修改
    $scope.punishRevise = function () {
        console.log(this);
        console.log(this.punish.id);
        $rootScope.punishId = this.punish.id;
        report.accurateArray(report.getUserLogin().token).then(function (response) {
            console.log(response);
            $scope.punishSelect = response.data.result.children;
            $scope.punishSelect.unshift(response.data.result);
            console.log($scope.punishSelect);
        })
        //修改里的内容获取
        report.punishAllContent(report.getUserLogin().token, $rootScope.punishId).then(function (response) {
            console.log(response.data.result);
            $scope.punishContent = response.data.result.content;
            $scope.punishTitle = response.data.result.title;
            $scope.punishStaff = response.data.result.staff;
            $scope.punishSelectMake = response.data.result.staffOrg.id;
            console.log($scope.punishContent);
        })
        //修改确定
        $scope.punishMake = function () {
            punishUpDateList = {
                token: report.getUserLogin().token,
                id: $rootScope.punishId,
                title: $scope.punishTitle,
                content: $scope.punishContent,
                staff: $scope.punishStaff,
                staffOrgId: $scope.punishSelectMake
            };
            console.log(punishUpDateList);
            report.punishUpDate(punishUpDateList).then(function (response) {
                // console.log(response);
            });
            swal("修改成功！", "", "success");
            $timeout(function(){
                $scope.punish();
            },500);
        }
    }
    $scope.punishDelBut = function () {//记录删除处分按钮
        console.log(this.punish.id);
        $scope.punishId = this.punish.id;
        $scope.punishDelete = function () {  //纪律处分删除
            report.punishDelete(report.getUserLogin().token, $scope.punishId).then(function (response) {
                // console.log(response);
            });
            swal("删除成功！", "", "success");
            $scope.punish();
        }
    }
}])