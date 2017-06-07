
/**
 * Created by LiuQiang on 2017/4/9.
 */
angular.module('myApp.controller')

.controller('accurateController',['$filter','$state', '$scope', '$rootScope', 'report',function ($filter,$state, $scope, $rootScope, report) {
    //部门类别调用
    var token = report.getUserLogin().token;
    $scope.accurateSelect = [];
    report.accurateArray(token).then(function (response) {
        console.log(response.data.result);
        $scope.accurateSelect = response.data.result.children;
        $scope.accurateSelect.unshift(response.data.result);
    })
    //精确查询页面数据调用
    $scope.select = 1;
    $scope.accurateUserName = '';
    $scope.accurateGet = function () {  //数据接口调用
        accurateGet = {
            token: report.getUserLogin().token,
            staff: $scope.accurateUserName,
            staffOrgId: $scope.select,
            page: '0',
            start: '0',
            limit: '20'
        };
        report.accurateList(accurateGet).then(function (response) {
            // console.log(response.data.result);
            $scope.accurateNumber = 10;
            $scope.accurateShouList = response.data.result;
            $scope.accuratePageTatal = Math.ceil($scope.accurateShouList.length / $scope.accurateNumber);

        })
    }
    //精确查询页排序
    $scope.order=function (a,ord) {
        if(ord==1){
            console.log(a);
            $scope.isTrue=false;
            $scope.accurateShouList=$filter('orderBy')($scope.accurateShouList,a,$scope.isTrue);
        }else if(ord==-1){
            $scope.isTrue=true;
            $scope.accurateShouList=$filter('orderBy')($scope.accurateShouList,a,$scope.isTrue);
        }
    }
    //精确查询分页
    $scope.accurateLimit = 0;
    $scope.accurateNowPage = 1;
    $scope.accurateDown = function () {
        if ($scope.accurateNowPage < $scope.accuratePageTatal) {
            $scope.accurateLimit = $scope.accurateLimit + $scope.accurateNumber;
            $scope.accurateNowPage = $scope.accurateNowPage + 1;
        }
    }
    $scope.accurateUp = function () {
        if ($scope.accurateLimit > 0) {
            $scope.accurateLimit = $scope.accurateLimit - $scope.accurateNumber;
            $scope.accurateNowPage = $scope.accurateNowPage - 1;
        }
    }
    $scope.accurateFirst = function () {
        $scope.accurateNowPage = 1;
        $scope.accurateLimit = 0;
    }
    $scope.accurateLast = function () {
        $scope.accurateNowPage = $scope.accuratePageTatal;
        $scope.accurateLimit = ($scope.accuratePageTatal - 1) * $scope.accurateNumber;
    }
    $scope.accuratePageBack = function () {
        location.reload();
    }
}])