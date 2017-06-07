/**
 * Created by LiuQiang on 2017/4/9.
 */
angular.module('myApp.controller')
.controller('dataController', ['$filter', '$state', '$scope', '$rootScope', 'report',function ($filter, $state, $scope, $rootScope, report) {
    $scope.dataList = {   //统计接口参数
        token: report.getUserLogin().token,
        eventCreateTimeFrom: '',
        eventCreateTimeTo: '',
        eventTimeFrom: '',
        eventTimeTo: ''
    }
    //统计库
    $scope.tab = function (dataTypeList, dataType1List, dataType2List) {
        var myChart = echarts.init(document.getElementById('main'));
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data: ['婚嫁', '丧葬', '平均次数']
            },
            xAxis: [
                {
                    type: 'category',
                    data: dataTypeList,
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '次数',
                    min: 0,
                    max: 2000,
                    interval: 250,
                    axisLabel: {
                        formatter: '{value} '
                    }
                },
            ],
            series: [
                {
                    name: '婚嫁',
                    type: 'bar',
                    data: dataType1List
                },
                {
                    name: '丧葬',
                    type: 'bar',
                    data: dataType2List
                },

            ]
        };
        myChart.setOption(option);
    }

    //统计查询
    $scope.dataQuery = function () {
        $scope.dataTypeList = [];
        $scope.dataType1List = [];
        $scope.dataType2List = [];
        $scope.dataList.eventCreateTimeFrom = $filter('date')($scope.createTimeFrom, 'yyyy-MM-dd');
        $scope.dataList.eventCreateTimeTo = $filter('date')($scope.createTimeTo, 'yyyy-MM-dd');
        $scope.dataList.eventTimeFrom = $filter('date')($scope.timeFrom, 'yyyy-MM-dd');
        $scope.dataList.eventTimeTo = $filter('date')($scope.timeTo, 'yyyy-MM-dd');
        //图表
        report.dataGet($scope.dataList).then(function (response) {
            // console.log(response.data.result);
            var i = 0;
            while (i < response.data.result.length) {
                $scope.dataTypeList.push(response.data.result[i].orgName);
                $scope.dataType1List.push(response.data.result[i].type1Count);
                $scope.dataType2List.push(response.data.result[i].type2Count);
                i++;
            }
            $scope.tab($scope.dataTypeList, $scope.dataType1List, $scope.dataType2List);
        })
    };
    $scope.dataQuery();//统计查询
}])