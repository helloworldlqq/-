/**
 * Created by zhangjie on 17-3-29.
 */
angular.module('myApp.service',[])
    .value('api',{
        api: 'http://bigbug.tech:8080/wdm-api/',//根地址
        userLogin:'api/user/auth.api',//登陆界面
        report:'api/wdm/event/add.api',//申报界面
        approvalSearch:'api/wdm/event/show_audit.api',//审批
        approvalMake:'api/wdm/event/audit.api',//审批操作
        showSearch:'api/wdm/event/show_bulletin.api',//公示查询
        showContent:'api/wdm/event_bulletin/add.api',//公示内容
        showResult:'api/wdm/event_bulletin_result/add.api',//公示结果

        supervisionSearch:'api/wdm/event/show_supervise.api',//现场监督

        supervisionMakeTitleOK:'api/wdm/event_supervise_report/add.api',//现场监督报告
        supervisionMakeOK:'api/wdm/event_supervise_report/get_by_event.api',//现场监督报告

        supervisionMakeTitleNO:'api/wdm/event_supervise_principle_breaking/add.api',//现场监督违纪登记
        supervisionMakeNO:'api/wdm/event_supervise_principle_breaking/get_by_event.api',//现场监督报告

        notificationList:'api/wdm/public_notification/show.api',//公开通报列表
        getOrgId:'api/org/show.api',//获取跟组织的id
        notificationAdd:'api/wdm/public_notification/add.api',//添加公开通报

        getNotification:'api/wdm/public_notification/get.api',//获取公开通报后台信息
        updateNotification:'api/wdm/public_notification/update.api',//更新公开通报后台信息

        notificationDel:'api/wdm/public_notification/delete.api',//shanchu公开通报

        combination:'api/wdm/event/search.api',//组合查询

        roleShow:'api/role/show.api',//角色管理
        getRole:'api/role/get.api',
        updateRole:'api/role/update.api',
        deleteRole:'api/role/delete.api',
        addRole:'api/role/add.api'
    })
    .factory('report', function (api,$http,$q,Upload) {
        return {
            //登陆页
            setUserLogin:function(userLogin){
                sessionStorage.setItem('userLogin',JSON.stringify(userLogin))
            },
            getUserLogin:function(){
                return JSON.parse(sessionStorage.getItem('userLogin'))
            },
            login:function(name,password){         //登录界面
                var deferred=$q.defer();
                $http.get(api.api+api.userLogin,{params:{username:name,password:password}})
                    .then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },

            //文件上传
            upload : function (file) {
                var deferred = $q.defer();
                Upload.upload({
                    url: 'http://bigbug.tech:8080/wdm-api/api/upload.api',
                    data: {file: file}
                })
                    .then(function successCallback(response) {
                        console.log(response);
                        deferred.resolve(response.data);
                    }, function errorCallback(response) {
                        deferred.reject(response.data);
                    });
                return deferred.promise;
            },





            //申报
            report: function (o) {   //申报界面
                $http.get(api.api+api.report,{params:o})
            },
            //审批
            approvalSearch:function(o){
                var deferred=$q.defer();
                // console.log(o);
                $http.get(api.api+api.approvalSearch,{params:o}).then(function(d){
                    console.log(d);
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            //审批的同意
            approvalMake:function(o){
                $http.get(api.api+api.approvalMake,{params:o})
            },
            //公示
            showList: function (publicityList) {
                var deferred = $q.defer();
                $http.get(api.api+api.showSearch,
                    {params:publicityList})
                    .then(function successCallback(response) {
                        // console.log(response);
                        deferred.resolve(response);
                    }, function errorCallback(response) {
                        deferred.reject(response)
                    });
                return deferred.promise;
            },
            //公示内容
            showContentUp: function (showContentList) {
                var deferred = $q.defer();
                $http.get(api.api+api.showContent,
                    {params: showContentList})
                    .then(function successCallback(response) {
                        // console.log(response);
                        deferred.resolve(response);
                    }, function errorCallback(response) {
                        deferred.reject(response)
                    });
                return deferred.promise;
            },
            //公示结果
            showResultUp: function (showResultList) {
                var deferred = $q.defer();
                $http.get (api.api+api.showResult,
                    {params:showResultList})
                    .then(function successCallback(response) {
                        // console.log(response);
                        deferred.resolve(response);
                    }, function errorCallback(response) {
                        deferred.reject(response)
                    });
                return deferred.promise;
            },
            // 现场监督
            supervisionSearch:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.supervisionSearch,{params:o}).then(function(d){
                    console.log(d);
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            // 监督报告
            supervisionMakeOk:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.supervisionMakeOK,{params:o}).then(function(d){
                    // console.log(d);
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },

            supervisionMakeTitleOk:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.supervisionMakeTitleOK,{params:o}).then(function(d){
                    // console.log(d);
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            // 违纪登记
            supervisionMakeNO:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.supervisionMakeNO,{params:o}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            supervisionMakeTitleNO:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.supervisionMakeTitleNO,{params:o}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            //精确查询
            accurateArray: function (TokenArray) {
                var deferred = $q.defer();

                $http.get('http://bigbug.tech:8080/wdm-api/api/org/show.api'
                    ,{params:{token:TokenArray}}
                    )
                    .then(function successCallback(response) {
                        // console.log(response);
                        deferred.resolve(response);
                    }, function errorCallback(response) {
                        deferred.reject(response)
                    });
                return deferred.promise;
            },
            //精确查询
            accurateList: function (accurateGet) {
                var deferred = $q.defer();
                $http.get('http://bigbug.tech:8080/wdm-api/api/wdm/event/search.api',
                    {params:accurateGet})
                    .then(function successCallback(response) {
                        deferred.resolve(response);
                    }, function errorCallback(response) {
                        deferred.reject(response)
                    });
                return deferred.promise;
            },
           //纪律处分列表展示内容
            punishList: function (punishGet) {
                var deferred = $q.defer();
                $http.get('http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/show.api',
                    {params:punishGet})
                    .then(function successCallback(response) {
                        // console.log(response);
                        deferred.resolve(response);
                    }, function errorCallback(response) {
                        deferred.reject(response)
                    });
                return deferred.promise;
            },
             //获取纪律处分全部内容
            punishAllContent:function (token,punId) {
                var deferred = $q.defer();
                $http.get('http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/get.api',
                    {params:{token:token,id:punId}})
                    .then(function successCallback(response) {
                        // console.log(response);
                        deferred.resolve(response);
                    }, function errorCallback(response) {
                        deferred.reject(response)
                    });
                return deferred.promise;
            },
            //纪律处分修改上传
            punishUpDate:function (punishUpDateList) {
                var deferred = $q.defer();
                $http.get('http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/update.api',
                    {params:punishUpDateList})
                    .then(function successCallback(response) {
                        // console.log(response);
                        deferred.resolve(response);
                    }, function errorCallback(response) {
                        deferred.reject(response)
                    });
                return deferred.promise;
            },
            punishDelete:function (deleteToken,deleteId) {
                var deferred = $q.defer();
                $http.get('http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/delete.api',
                    {params:{token:deleteToken,id:deleteId}})
                    .then(function successCallback(response) {
                        // console.log(response);
                        deferred.resolve(response);
                    }, function errorCallback(response) {
                        deferred.reject(response)
                    });
                return deferred.promise;
            },
            punishAddGet:function (punishAddList) {
                var deferred = $q.defer();
                $http.get('http://bigbug.tech:8080/wdm-api/api/wdm/discipline_punish/add.api',
                    {params:punishAddList})
                    .then(function successCallback(response) {
                        // console.log(response);
                        deferred.resolve(response);
                    }, function errorCallback(response) {
                        deferred.reject(response)
                    });
                return deferred.promise;
            },




            //公开通报
            notificationList:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.notificationList,{params:o}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            getOrgId:function(v){
                var deferred=$q.defer();
                $http.get(api.api+api.getOrgId,{params:{token:v}}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            notificationAdd:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.notificationAdd,{params:o}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            getNotification:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.getNotification,{params:o}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            updateNotification:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.updateNotification,{params:o}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            notificationDel:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.notificationDel,{params:o}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            combination:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.combination,{params:o}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            //角色管理
            roleShow:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.roleShow,{params:o}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            getRole:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.getRole,{params:o}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            updateRole:function(str){
                var deferred=$q.defer();
                $http.get(api.api+api.updateRole+str).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            deleteRole:function(o){
                var deferred=$q.defer();
                $http.get(api.api+api.deleteRole,{params:o}).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            addRole:function(str){
                var deferred=$q.defer();
                $http.get(api.api+api.addRole+str).then(function(d){
                    deferred.resolve(d)
                },function(d){
                    deferred.reject(d)
                });
                return deferred.promise
            },
            //用户管理
            //     用户管理数据
            userManageData: function (params) {
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/show.api',
                    params: params
                }).then(
                    function (value) {
                        console.log(value);
                        deferred.resolve(value);
                    },
                    function (error) {
                        console.log(error);
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            //获取用户id
            userId:function (params) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/get.api',
                    params: params
                }).then(
                    function (value) {
                        console.log(value);
                        deferred.resolve(value);
                    },
                    function (error) {
                        console.log(error);
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            //获取当前部门
            currentDepartment:function(params){
                var deferred = $q.defer();
                $http({
                    method:'post',
                    url:'http://bigbug.tech:8080/wdm-api/api/org/show.api',
                    params:params
                }).then(
                    function (value) {
                        console.log(value);
                        deferred.resolve(value);
                    },
                    function (error) {
                        console.log(error);
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            //获取用户角色
            userRole:function(params){
                var deferred = $q.defer();
                $http({
                    method:'post',
                    url:'http://bigbug.tech:8080/wdm-api/api/role/get_all.api',
                    params:params
                }).then(
                    function (value) {
                        console.log(value);
                        deferred.resolve(value);
                    },
                    function (error) {
                        console.log(error);
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            //确认修改数据
            sureModifyData:function (params) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/update.api',
                    params: params
                }).then(
                    function (value) {
                        console.log(value);
                        deferred.resolve(value);
                    },
                    function (error) {
                        console.log(error);
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            //删除用户信息
            deleteUserInformation:function (params) {
                var deferred = $q.defer();
                $http({
                    method: 'post',
                    url: 'http://bigbug.tech:8080/wdm-api/api/user/delete.api',
                    params: params
                }).then(
                    function (value) {
                        console.log(value);
                        deferred.resolve(value);
                    },
                    function (error) {
                        console.log(error);
                        deferred.reject(error);
                    });
                return deferred.promise;
            },
            // 增加用户  确认增加
            addUser:function (params) {
                var deferred=$q.defer();
                $http({
                    method:'post',
                    url:'http://bigbug.tech:8080/wdm-api/api/user/add.api',
                    params:params
                }).then(function (value) {
                    console.log(value);
                    deferred.resolve(value)
                },function (error) {
                    console.log(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            },


            //图表
            dataGet:function (params) {
                var deferred=$q.defer();
                $http({
                    method:'get',
                    url:'http://bigbug.tech:8080/wdm-api/api/wdm/event/org_event_type_count',
                    params:params
                }).then(function (value) {
                    console.log(value);
                    deferred.resolve(value)
                },function (error) {
                    console.log(error);
                    deferred.reject(error);
                });
                return deferred.promise;
            },



        }
    })