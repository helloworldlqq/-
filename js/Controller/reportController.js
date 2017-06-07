/**
 * Created by LiuQiang on 2017/4/9.
 */
angular.module('myApp.controller')
    .controller('reportController', ['$scope', 'report', '$rootScope', '$filter',function ($scope, report, $rootScope, $filter) {
        // 申报参数对象
        $scope.o = {
            token: report.getUserLogin().token,
            staff: '',
            staffRelationship: 1,
            staffPoliticalStatus: '',
            staffJob: 1,
            staffSpouse: '',
            staffPhone: '',
            eventType: 1,
            eventCount: 1,
            eventDate: '',
            location: '',
            tableCount: 1,
            peopleCount: 1,
            peopleRange: '',
            carCount: 1,
            carSource: '',
            attachmentFileCode:'',
            selfPromise: '',
            promisePeople: '',
            staffOrgId: 1
        };
        //申报界面的四个多选表单--1.对象;2.初始值;3.选框change事件
        $scope.staffRelationshipArr = [{'i': 1, 'v': '本人'}, {'i': 2, 'v': '直系亲属'}];
        $scope.rel = $scope.staffRelationshipArr[0];
        $scope.staffJobArr = [{'i': 1, 'v': '县级党员干部'}, {'i': 2, 'v': '科级党员干部'}, {'i': 3, 'v': '社区基层干部'}, {'i': 4, 'v': '一般工作人员'}];
        $scope.job = $scope.staffJobArr[0];
        $scope.eventTypeArr = [{'i': 1, 'v': '婚嫁'}, {'i': 2, 'v': '丧葬'}];
        $scope.event = $scope.eventTypeArr[0];
        (function (){
            report.getOrgId($scope.o.token).then(function(d){
                // console.log(d.data.result);
                $scope.staffOrgIdArr=d.data.result.children;
                $scope.staffOrgIdArr.unshift({'father':'father','id':d.data.result.id,'name':d.data.result.name});
                $scope.org = $scope.staffOrgIdArr[0];
            },function(d){
                console.log(d)
            });
        })()
        $scope.staffRelationshipMake = function (o) {                                                    //
            $scope.o.staffRelationship = o.i;
        };
        $scope.staffJobMake = function (o) {                                                    //
            $scope.o.staffJob = o.i;
        };
        $scope.eventTypeMake = function (o) {                                                    //
            $scope.o.eventType = o.i;
        };
        $scope.staffOrgIdMake = function (o) {
            $scope.o.staffOrgId = o.id;
        };
        //申报提交的点击事件
        $scope.reportSubmit = function () {
            //判断信息是否完整：否提示输入完整;是掉接口
            if ($scope.report.$invalid) {
                swal("请出入完整信息");
            } else {
                //判断时间是否给定：是转换格式;否获取当前并转换格式
                if (!$scope.initDate) {
                    var date = new Date();
                    $scope.o.eventDate = $filter('date')(date, 'yyyy-MM-dd hh:mm:ss');
                } else {
                    $scope.o.eventDate = $filter('date')($scope.initDate, 'yyyy-MM-dd hh:mm:ss');
                }
                // 调接口

                //文件上传判断
                console.log($scope.report.files.$valid);
                console.log($scope.o.attachmentFileCode);
                if ($scope.report.files.$valid && $scope.o.attachmentFileCode) {

                    report.upload($scope.o.attachmentFileCode[0])
                        .then(function (data) {
                            $scope.o.attachmentFileCode=data.result.code;
                            if(!$scope.attachmentFileCode){
                                $scope.attachmentFileCode='';
                            }
                            report.report($scope.o);
                                // .then(function (data) {
                                //     // console.log(data);
                                    swal("申报成功", "", "success");
                                // },function () {
                                //     swal("申报失败，请重试", "", "success");
                                // });


                        },function () {});
                }


            }
        }
    }])