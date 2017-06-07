/**
 * Created by LiuQiang on 2017/4/9.
 */
angular.module('myApp.controller')
.controller('userManageController', ['$filter','$scope', 'report',function ($filter,$scope, report) {

    //用户管理页排序
    $scope.order=function (a,ord) {
        if(ord==1){

            $scope.isTrue=false;
            $scope.userManage=$filter('orderBy')($scope.userManage,a,$scope.isTrue);
        }else if(ord==-1){
            $scope.isTrue=true;
            $scope.userManage=$filter('orderBy')($scope.userManage,a,$scope.isTrue);
        }
    }


    //用户管理数据
    $scope.dataList=9;
    $scope.userPageNow=1;
    $scope.userPageStart=1;

    $scope.refresh=function () {
        report.userManageData({
            token: report.getUserLogin().token,
            page: 0,
            start: $scope.userPageStart,
            limit: $scope.dataList

        }).then(function (data) {
            // console.log(data);
            $scope.userTotal=data.data.total;
            $scope.userManage = data.data.result;
            // console.log($scope.userTotal);
            $scope.userPageTotal=Math.ceil($scope.userTotal/$scope.dataList);
        }, function (error) {
            console.log(error);
        })
    }
    $scope.refresh();


    //首页
    $scope.accurateFirst=function () {
        $scope.userPageNow=1;
        $scope.userPageStart=1;
        $scope.refresh();
    }

    //下一页
    $scope.accurateDown=function () {

        if($scope.userPageNow<$scope.userPageTotal){
            $scope.userPageNow++;
            $scope.userPageStart=$scope.userPageStart+$scope.dataList;
            $scope.refresh();
        }

    }

    //上一页
    $scope.accurateUp=function () {
        if($scope.userPageNow>1){
            $scope.userPageNow--;
            $scope.userPageStart=$scope.userPageStart-$scope.dataList;
            $scope.refresh();
        }

    }

    //最后一页
    $scope.accurateLast=function () {
        $scope.userPageNow=$scope.userPageTotal;
        $scope.userPageStart=($scope.userPageTotal-1)*$scope.dataList;
        $scope.refresh();
    }

    //刷新
    $scope.accuratePageBack=function () {
        $scope.refresh();
    }




    // 点击修改
    $scope.modify = function () {
        console.log(this);
        $scope.userId = this.user.id;
        $scope.dataModifyList = {
            token: report.getUserLogin().token,
            userId: this.user.id,
            orgId: 1,
            roleId: '',
            name: '',
            password: ''
        }
        //获取当前部门数据
        report.currentDepartment({
            token: report.getUserLogin().token
        }).then(function (data) {
            $scope.department = data.data.result.children.unshift(data.data.result);
            $scope.department = data.data.result.children;
            console.log($scope.department);
        }, function (error) {
        })
        //获取用户角色数据
        report.userRole({
            token: report.getUserLogin().token,
            roleId: this.user.id
        }).then(function (data) {
            $scope.roles = data.data.result;
            console.log($scope.roles)
        }, function (error) {
        })
        //
        report.userId({
            token: report.getUserLogin().token,
            userId: this.user.id
        }).then(function (data) {
            // console.log(data.data.result);
            $scope.dataModifyList.name = data.data.result.name;
            $scope.dataModifyList.username = data.data.result.username;
            $scope.dataModifyList.orgId = data.data.result.organization.id;
            $scope.dataModifyList.roleId = data.data.result.role.id;
            console.log($scope.dataModifyList.roleId);
        }, function (error) {
            console.log(error);
        })
    }
    // 确定修改数据
    $scope.sureModify = function () {
        console.log($scope.dataModifyList);
        report.sureModifyData($scope.dataModifyList).then(
            function (data) {
                // console.log(data);
                $scope.refresh();
                swal("修改成功!", "", "success");
            }, function (error) {
                console.log(error);
                swal("修改失败!", "", "error");
            })
    };
    // 删除用户信息
    $scope.sureDelete = function () {
        // console.log(this);
        var data = {
            token: report.getUserLogin().token,
            id: this.user.id
        }
        report.deleteUserInformation(data).then(
            function (data) {
                console.log(data)
                swal("删除成功!", "", "success");
                $scope.refresh();
            }, function (error) {
                console.log(error)
                swal("删除失败!", "", "error");
            })
    };
    // 点击新增用户
    $scope.newAdd=function () {

        $scope.addData = {
            token: report.getUserLogin().token,
            orgId:1,
            username:'',
            name:'',
            password:'',
            roleId:''
        }
        $scope.addData.username='';
        $scope.addData.name='';
        $scope.addData.password='';
        $scope.addData.orgId=1;
        $scope.addData.roleId='';
        $scope.surePassword='';
        //获取当前部门数据
        report.currentDepartment({
            token: report.getUserLogin().token
        }).then(function (data) {
            // console.log(data)
            $scope.department = data.data.result.children.unshift(data.data.result);
            $scope.department = data.data.result.children;
        }, function (error) {

        });
        //获取用户角色数据
        report.userRole({
            token: report.getUserLogin().token,
            roleId: 0
        }).then(function (data) {
            // console.log(data)
            $scope.roles = data.data.result;
        }, function (error) {

        })
    }
    // 确认增加用户
    $scope.sureAdd=function () {
        report.addUser($scope.addData ).then
        (function (data) {
            // console.log(data);
            $('#myModal').modal('hide');
            swal("添加成功!", "", "success");
            $scope.addUserModal.$submitted=false;
            $scope.refresh();
        },function (error) {
            // console.log(error)
            swal("添加失败!", "", "error");
        })
    }

    // 分页


}])