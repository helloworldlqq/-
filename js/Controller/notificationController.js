/**
 * Created by LiuQiang on 2017/4/9.
 */

angular.module('myApp.controller')
//公开通报
.controller('notificationController', ['$filter','$scope', '$rootScope', 'report',function ($filter,$scope, $rootScope, report) {     //审批界面
    $scope.o = {                                                                            //查询输入的参数
        token: report.getUserLogin().token,//令牌
        staff: '',//申报人
        page: 1,
        start: 0,//从第几个开始9
        limit: 9//每页显示多少个9
    };
    $scope.addO = {
        token: report.getUserLogin().token,//令牌
        title: '',
        content: '',
        staff: '',
        staffOrgId: 1
    };
    $scope.getNotificationInfo = {
        token: report.getUserLogin().token,//令牌
        id: '',
        title: '',
        content: '',
        staff: '',
        staffOrgId: ''
    };
    $scope.getNotificationArr=function (v) {         // //审批--查询界面                              //获取数据的方法
        report.notificationList(v).then(function (d) {
            // console.log(d.data.result);
            if (!d.data.result.length) {
                swal("查询信息不存在", "请重新输入");
            } else {
                $scope.arr = d.data.result;
                $scope.total = d.data.total;
                $scope.pageSum = Math.ceil($scope.total / $scope.o.limit);
            }
        }, function (d) {
            console.log(d)
        });
    }
    //公开通报页排序
    $scope.order=function (a,ord) {
        if(ord==1){
            $scope.isTrue=false;
            $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
        }else if(ord==-1){
            $scope.isTrue=true;
            $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
        }
    }
    $scope.getOrgIdArr=function (v, index) {         // 获取所有的staffOrgId
        report.getOrgId(v).then(function (d) {
            console.log(d.data.result);
            $scope.orgIdArr = d.data.result.children;
            $scope.orgIdArr.unshift({'father': 'father', 'id': d.data.result.id, 'name': d.data.result.name});
            if (index) {
                $scope.orgIdArr.some(function (v, i, a) {
                    $scope.getOrgIdArrIndex = i;
                    return v.id == index
                })
            } else {
                $scope.getOrgIdArrIndex = index;
            }
            $scope.orgIdOptions = $scope.orgIdArr[$scope.getOrgIdArrIndex];

        }, function (d) {
            console.log(d)
        });
    }
    $scope.notificationAdds=function (v) {
        // 添加Notification
        report.notificationAdd(v).then(function (d) {
            console.log(d.data.result);
        }, function (d) {
            console.log(d)
        });
    }
    $scope.notificationDel=function (v) {
        report.notificationDel(v).then(function (d) {
            console.log(d.data.result);
        }, function (d) {
            console.log(d)
        });
    }
    $scope.getNotification=function (v) {         // 获取公开通报后台信息
        report.getNotification(v).then(function (d) {
            $scope.getNotificationInfo.content = d.data.result.content;
            $scope.getNotificationInfo.staff = d.data.result.staff;
            $scope.getNotificationInfo.title = d.data.result.title;
            $scope.getNotificationInfo.staffOrgId = d.data.result.staffOrg.id;
            $scope.getOrgIdArr($scope.o.token, $scope.getNotificationInfo.staffOrgId);
        }, function (d) {
            console.log(d)
        });
    }

    $scope.updateNotification=function (v) {         // 更新公开通报后台信息
        report.updateNotification(v).then(function (d) {
        }, function (d) {
            console.log(d)
        });
    }
    $scope.orgIdSelect = function (v) {//获取staffOrgId
        console.log(v.id);
        $scope.addO.staffOrgId = v.id;
        $scope.getNotificationInfo.staffOrgId = v.id;
    }
    $scope.getNotificationArr($scope.o);//获取数据
    $scope.search = function () {
        $scope.o.page = '1';
        $scope.o.start = '0';
        $scope.getNotificationArr($scope.o);
    }
    $scope.add = function () {//查询的按钮
        $scope.getOrgIdArr($scope.o.token, 0);
    }
    $scope.addOk = function () {
        $scope.notificationAdds($scope.addO);
        setTimeout(function(){
            $scope.o.page = '1';
            $scope.o.start = '0';
            $scope.getNotificationArr($scope.o);
        },200)
    }
    $scope.update = function (v) {
        $scope.getNotificationInfo.id = v;
        $scope.getNotification({token: $scope.o.token, id: v});
    }
    $scope.updateOK = function () {
        $scope.updateNotification($scope.getNotificationInfo);

        setTimeout(function(){
            $scope.o.page = '1';
            $scope.o.start = '0';
            $scope.getNotificationArr($scope.o);
        },200)
    }
    $scope.del = function (v) {
        $scope.notificationDel({token: $scope.o.token, id: v});
        setTimeout(function(){
            $scope.o.page = '1';
            $scope.o.start = '0';
            $scope.getNotificationArr($scope.o);
        },200)
        swal("删除成功", "请重新输入", "success");
    }
    $scope.firstPage = function () {
        $scope.o.page = '1';
        $scope.o.start = '0';
        $scope.getNotificationArr($scope.o);
    };
    $scope.prePage = function () {
        if ($scope.o.page > 1) {
            $scope.o.page--;
            $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
            $scope.getNotificationArr($scope.o);
        }
    };
    $scope.nextPage = function () {
        if ($scope.o.page < $scope.pageSum) {
            $scope.o.page++;
            $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
            $scope.getNotificationArr($scope.o);
        }
    };
    $scope.lastPage = function () {
        $scope.o.page = $scope.pageSum;
        $scope.o.start = ($scope.o.page - 1) * $scope.o.limit;
        console.log($scope.o.start);
        $scope.getNotificationArr($scope.o);
    };
    $scope.refreshPage = function () {
        $scope.o.page = '1';
        $scope.o.start = '0';
        $scope.getNotificationArr($scope.o);
    };
}])