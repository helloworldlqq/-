/**
 * Created by LiuQiang on 2017/4/9.
 */

angular.module('myApp.controller')
.controller('roleController',['$scope','$rootScope','report','$filter',function ($scope,$rootScope,report,$filter) {
    $scope.o={
        token:report.getUserLogin().token,//令牌
        page:1,
        start:0,
        limit:9//每页显示多少个
    };
    $scope.getO={
        token:report.getUserLogin().token,//令牌
        roleId:''
    };
    $scope.deleteO={
        token:report.getUserLogin().token,//令牌
        id:'',
    }
    $scope.getRoleArr=function (v){
        report.roleShow(v).then(function(d){
            console.log(d);
            $scope.arr=d.data.result;
            $scope.total=d.data.total;
            $scope.pageSum=Math.ceil($scope.total/$scope.o.limit);
        },function(d){
            console.log(d)
        });
    }


    //角色管理页排序
    $scope.order=function (a,ord) {
        if(ord==1){

            $scope.isTrue=false;
            $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
        }else if(ord==-1){
            $scope.isTrue=true;
            $scope.arr=$filter('orderBy')($scope.arr,a,$scope.isTrue);
        }
    }



    $scope.getRoleArr($scope.o);
    $scope.getRoleInfo=function (v){

        report.getRole(v).then(function(d){
            console.log(d)
            $scope.modelCurrentRoleName=d.data.result.name;
            $scope.modelCurrentRoleId=d.data.result.id;
            $scope.modelCurrentArr=d.data.result.functions;
            $scope.modelArr=report.getUserLogin().user.role.functions;
            $scope.modelArr.forEach(function(v){
                v.isSelect = $scope.modelCurrentArr.some(function (Cv) {
                    return v.code==Cv.code
                })
            });
        },function(d){
            console.log(d)
        });
    }
    $scope.addRoleInfo=function (v){
        report.addRole(v).then(function(d){
            console.log(d);
        },function(d){
            console.log(d)
        });
    }
    $scope.addContent=function(){
        $scope.modelAddRoleName='';
        $scope.modelArr=report.getUserLogin().user.role.functions;
        console.log(report.getUserLogin());
    }
    $scope.submitContent=function(){
        $scope.updateStr='';
        $scope.modelArr.forEach(function (v) {
            if(v.isSelect){
                $scope.updateStr=$scope.updateStr+'&functionCodes='+v.code
            }
        });
        $scope.updateStr='?token='+$scope.getO.token+'&roleName='+$scope.modelAddRoleName+$scope.updateStr;
        console.log($scope.updateStr);
        $scope.addRoleInfo($scope.updateStr);
        setTimeout(function(){
            $scope.getRoleArr($scope.o);
        },200)
    }
    $scope.showContent=function(id){
        $scope.getO.roleId=id;
        $scope.getRoleInfo($scope.getO);
    }
    $scope.updateRoleInfo=function (v){
        report.updateRole(v).then(function(d){
            console.log(d)
        },function(d){
            console.log(d)
        });
    }
    $scope.getDeleteRole=function (v){
        report.deleteRole(v).then(function(d){
            console.log(d)
        },function(d){
            console.log(d)
        });
    }
    $scope.deleteRole=function(id){
        $scope.deleteO.id=id;
        $scope.getDeleteRole($scope.deleteO);
        setTimeout(function(){
            $scope.getRoleArr($scope.o);
        },200)
    }
    $scope.updateContent=function(){
        $scope.updateStr='';
        $scope.modelArr.forEach(function (v) {
            if(v.isSelect){
                $scope.updateStr=$scope.updateStr+'&functionCodes='+v.code
            }
        })
        $scope.updateStr='?token='+$scope.getO.token+'&roleId='+$scope.modelCurrentRoleId+'&roleName='+$scope.modelCurrentRoleName+$scope.updateStr
        // console.log($scope.updateStr);
        $scope.updateRoleInfo($scope.updateStr);
        setTimeout(function(){
            $scope.getRoleArr($scope.o);
        },200)
    }
    $scope.firstPage=function(){
        $scope.o.page='1';
        $scope.o.start='0';
        $scope.getRoleArr($scope.o);
    };
    $scope.prePage=function(){
        if($scope.o.page>1){
            $scope.o.page--;
            $scope.o.start=($scope.o.page-1)*$scope.o.limit;
            $scope.getRoleArr($scope.o);
        }
    };
    $scope.nextPage=function(){
        if($scope.o.page<$scope.pageSum){
            $scope.o.page++;
            $scope.o.start=($scope.o.page-1)*$scope.o.limit;
            $scope.getRoleArr($scope.o);
        }
    };
    $scope.lastPage=function(){
        $scope.o.page=$scope.pageSum;
        $scope.o.start=($scope.o.page-1)*$scope.o.limit;
        $scope.getRoleArr($scope.o);
    };
    $scope.refreshPage=function(){
        $scope.o.page='1';
        $scope.o.start='0';
        $scope.getRoleArr($scope.o);
    };
}])
