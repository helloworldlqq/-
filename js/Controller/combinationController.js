/**
 * Created by LiuQiang on 2017/4/9.
 */

angular.module('myApp.controller')
//组合查询
.controller('combinationController', ['$scope', '$rootScope', 'report', '$filter',function ($scope, $rootScope, report, $filter) {
    $scope.o = {
        token: report.getUserLogin().token,//令牌
        eventType: 0,
        peopleCountMin: 0,
        peopleCountMax: 0,
        eventCreateTimeFrom: '',
        eventCreateTimeTo: '',
        eventTimeFrom: '',
        eventTimeTo: '',
        page: 1,
        start: 0,
        limit: 9//每页显示多少个
    };
    $scope.eventTypeO = [{'i': 0, 'v': '全部'}, {'i': 1, 'v': '婚嫁'}, {'i': 2, 'v': '丧葬'}];
    $scope.peopleCountO = [{'i': 0, 'v': '全部'}, {'i': 1, 'v': '0-50人'}, {'i': 2, 'v': '50-100人'}, {
        'i': 3,
        'v': '100-150人'
    }, {'i': 4, 'v': '150-200人'}];
    $scope.eventTypeDefault = $scope.eventTypeO[0];
    $scope.peopleCountDefault = $scope.peopleCountO[0];
    $scope.eventType = function (o) {
        console.log(o.i);
        $scope.o.eventType = o.i;
    };
    $scope.peopleCount = function (o) {
        console.log(o.i);
        $scope.o.peopleCountMax = o.i * 50;
        if (o.i > 0) {
            $scope.o.peopleCountMin = $scope.o.peopleCountMax - 50;
        } else {
            $scope.o.peopleCountMin = 0;
        }
        console.log($scope.o);
    };
    $scope.total=0;
    $scope.pageSum=0;
    $scope.getCombinationArr=function (v){
        report.combination(v).then(function(d){
            $scope.initArr = d.data.result;
            $scope.arr = $filter('limitTo')($scope.initArr, '9', '0');
            $scope.total = d.data.total;
            $scope.pageSum = Math.ceil($scope.total / 9);
        }, function (d) {
            console.log(d)
        });
    }
    //组合查询页排序
    $scope.order=function (a,ord) {
        if(ord==1){
            $scope.isTrue=false;
            $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
        }else if(ord==-1){
            $scope.isTrue=true;
            $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
        }
    }
    $scope.combinationSearch = function () {
        $scope.o.eventCreateTimeFrom = $filter('date')($scope.createTimeFrom, 'yyyy-MM-dd');
        $scope.o.eventCreateTimeTo = $filter('date')($scope.createTimeTo, 'yyyy-MM-dd');
        $scope.o.eventTimeFrom = $filter('date')($scope.timeFrom, 'yyyy-MM-dd');
        $scope.o.eventTimeTo = $filter('date')($scope.timeTo, 'yyyy-MM-dd');
        $scope.getCombinationArr($scope.o);
    }
    $scope.currentPageNum = 1;
    $scope.firstPage = function () {
        $scope.currentPageNum = 1;
        $scope.arr = $filter('limitTo')($scope.initArr, '9', ($scope.currentPageNum - 1) * 9);
    };
    $scope.prePage = function () {
        if ($scope.currentPageNum > 1) {
            $scope.currentPageNum--;
            $scope.arr = $filter('limitTo')($scope.initArr, '9', ($scope.currentPageNum - 1) * 9);
        }
    };
    $scope.nextPage = function () {
        console.log(234);
        console.log($scope.currentPageNum);
        console.log($scope.pageSum);
        if ($scope.currentPageNum < $scope.pageSum) {
            $scope.currentPageNum++;
            console.log($scope.currentPageNum);
            $scope.arr = $filter('limitTo')($scope.initArr, '9', ($scope.currentPageNum - 1) * 9);
            console.log($scope.arr);
        }
    };
    $scope.lastPage = function () {
        $scope.currentPageNum = $scope.pageSum;
        $scope.arr = $filter('limitTo')($scope.initArr, '9', ($scope.currentPageNum - 1) * 9);
    };
    $scope.refreshPage = function () {
        $scope.currentPageNum = 1;
        $scope.arr = $filter('limitTo')($scope.initArr, '9', ($scope.currentPageNum - 1) * 9);
    };
}])