/**
 * Created by LiuQiang on 2017/4/9.
 */
angular.module('myApp.controller')
.controller('publicityController', ['$filter','$state', '$scope', '$rootScope', 'report',function ($filter,$state, $scope, $rootScope, report) {
    $scope.x = '-1';
    $scope.nowPage = 1;
    $scope.totalPage = 1;
    $scope.publicityName = '';
    $scope.publicityPage = 0;
    $scope.publicityStart = 0;
    $scope.publicityLimit = 9;
    //公示页排序
    $scope.order=function (a,ord) {
        if(ord==1){
            $scope.isTrue=false;
            $scope.showList=$filter('orderBy')($scope.showList,a,$scope.isTrue);
        }else if(ord==-1){
            $scope.isTrue=true;
            $scope.showList=$filter('orderBy')($scope.showList,a,$scope.isTrue);
        }
    }

    $scope.get = function (publicityList) {
        report.showList(publicityList).then(function (response) {
            console.log(response);
            $scope.showList = response.data.result;
            $scope.publicityTotal = response.data.total;
            $scope.totalPage = Math.ceil(response.data.total / $scope.publicityLimit);
        });
    }

    $scope.publicityList = {
        token: report.getUserLogin().token,
        staff:'',
        bulletinStatus:'-1',
        page: $scope.publicityPage,
        start: $scope.publicityStart,
        limit: $scope.publicityLimit
    };

    $scope.get($scope.publicityList);
    $scope.publicityGet = function () {
        $scope.publicityList.staff=$scope.publicityName;
        $scope.publicityList.bulletinStatus= $scope.x;

        $scope.publicityList.page=1;
        $scope.publicityList.start=0;
        $scope.get($scope.publicityList);
        $scope.publicityFirst();
    }
    $scope.publicityNext = function () {
        if ($scope.publicityList.start < ($scope.totalPage - 1) * $scope.publicityList.limit) {
            $scope.publicityList.start = $scope.publicityList.start + $scope.publicityList.limit;
            $scope.get($scope.publicityList);
            $scope.nowPage = $scope.nowPage + 1;
        }
    }
    $scope.publicityUp = function () {
        if ($scope.publicityList.start > 0) {
            $scope.publicityList.start = $scope.publicityList.start - $scope.publicityList.limit;
            $scope.get($scope.publicityList);
            $scope.nowPage = $scope.nowPage - 1;
        }
    }
    $scope.publicityFirst = function () {
        $scope.publicityList.start = 0;
        $scope.get($scope.publicityList);
        $scope.nowPage = 1;
    }
    $scope.publicityLast = function () {
        $scope.publicityList.start = ($scope.totalPage - 1) * $scope.publicityList.limit;
        $scope.get($scope.publicityList);
        $scope.nowPage = $scope.totalPage;
    }
    //公示内容提交
    $scope.showContent = function (id) {
        $scope.id = id;
    };
    $scope.content = '';
    $scope.attachmentFileCode = '';
    $scope.ContentUp = function () {
        $scope.showContentList = {
            token: report.getUserLogin().token,
            eventId: $scope.id,
            content: $scope.content,
            attachmentFileCode: ''
        };



            report.showContentUp($scope.showContentList).then(function (response) {
                console.log(response);
                $scope.content='';
            })
            $scope.get($scope.publicityList);
            swal("公示成功！", "", "success");


    }
    $scope.resultStatus = '1';

    $scope.showResultContent='';
    $scope.resultUp = function () {
        $scope.showResultList = {
            token: report.getUserLogin().token,
            eventId: $scope.id,
            status: $scope.resultStatus,
            content:$scope.showResultContent
        };
        // console.log($scope.showResultContent);


            report.showResultUp($scope.showResultList).then(function (response) {
                console.log(response);
                $scope.showResultContent='';
            })
            $scope.get($scope.publicityList);
            swal("公示结果成功！", "", "success");


    }
}])