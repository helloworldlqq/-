/**
 * Created by LiuQiang on 2017/3/28.
 */
angular.module('myApp',['myApp.controller','myApp.service','ngFileUpload','ui.router'])
    .config(function ($stateProvider,$urlRouterProvider,$locationProvider){
        $stateProvider
            .state('login',{
                url:'/login',
                templateUrl:'templates/login.html',
                controller:'loginController'
            })
            .state('menu',{
                url:'/menu',
                templateUrl:'templates/menu.html',
                controller:'menuController'
            })
            .state('menu.approval',{    //申报管理 审批
                url:'/approval',
                templateUrl:'templates/menu.html',
                views:{
                    'mainContent':{
                        templateUrl:'templates/approval.html',
                        controller:'approvalController'
                    }
                }
            })
            .state('menu.notification',{    //责任追究 公开通报
                url:'/notification',
                templateUrl:'templates/menu.html',
                views:{
                    'mainContent':{
                        templateUrl:'templates/notification.html',
                        controller:'notificationController'
                    }
                }
            })
            .state('menu.publicity',{    //申报管理 公示
                url:'/publicity',
                templateUrl:'templates/menu.html',
                views:{
                    'mainContent':{
                        templateUrl:'templates/publicity.html',
                        controller:'publicityController'
                    }
                }
            })
            .state('menu.punish',{    //责任追究 纪律处分
                url:'/punish',
                templateUrl:'templates/menu.html',
                views:{
                    'mainContent':{
                        templateUrl:'templates/punish.html',
                        controller:'punishController'
                    }
                }
            })
            .state('menu.report',{    //申报管理 申报
                url:'/report',
                templateUrl:'templates/menu.html',
                views:{
                    'mainContent':{
                        templateUrl:'templates/report.html',
                        controller:'reportController'
                    }
                }
            })
            .state('menu.role',{    //系统设置 角色管理
                url:'/role',
                templateUrl:'templates/menu.html',
                views:{
                    'mainContent':{
                        templateUrl:'templates/role.html',
                        controller:'roleController'
                    }
                }
            })
            .state('menu.supervision',{    //申报管理 现场监督
                url:'/supervision',
                templateUrl:'templates/menu.html',
                views:{
                    'mainContent':{
                        templateUrl:'templates/supervision.html',
                        controller:'supervisionController'
                    }
                }
            })
            .state('menu.user',{    //系系统设置 用户管理
                url:'/user',
                templateUrl:'templates/menu.html',
                views:{
                    'mainContent':{
                        templateUrl:'templates/user.html',
                        controller:'userManageController'
                    }
                }
            })
            .state('menu.accurate',{    //申报 查询统计 精确查询
                url:'/accurate',
                templateUrl:'templates/menu.html',
                views:{
                    'mainContent':{
                        templateUrl:'templates/accurate.html',
                        controller:'accurateController'

                    }
                }
            })
            .state('menu.combination',{    //申报 查询统计 组合查询
                url:'/combination',
                templateUrl:'templates/menu.html',
                views:{
                    'mainContent':{
                        templateUrl:'templates/combination.html',
                        controller:'combinationController'
                    }
                }
            })
            .state('menu.data',{    //申报 查询统计 数量统计
                url:'/data',
                templateUrl:'templates/menu.html',
                views:{
                    'mainContent':{
                        templateUrl:'templates/data.html',
                        controller:'dataController'
                    }
                }
            })
        $urlRouterProvider.otherwise('/login');
        $locationProvider.hashPrefix('');
    })