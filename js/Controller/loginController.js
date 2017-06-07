/**
 * Created by LiuQiang on 2017/4/9.
 */
angular.module('myApp.controller')
// 登陆页
    .controller('loginController', ['$state', '$scope', '$rootScope', 'report',function ($state, $scope, $rootScope, report) {
        //登陆的点击事件
        $scope.loginAction = function () {
            report.login($scope.userName, $scope.userPassword).then(function (d) {
                console.log(d);
                //判断登陆是否成功：是进行跳转及存储登陆接口信息;否sweetAlert
                if (d.data.result) {
                    report.setUserLogin(d.data.result);
                    $state.go('menu.report');
                } else {
                    swal("用户名或密码错误", "请重新输入");
                    $state.go('login')
                }
            }, function (d) {
                console.log(d)
            });
        }
    }])