/**
 * Created by Administrator on 2017/4/29.
 */
angular.module("myapp",[]).controller("ctrl",["$scope","$filter",function ($scope,$filter) {
    $scope.data=localStorage.data?JSON.parse(localStorage.data):[];
    $scope.done=localStorage.done?JSON.parse(localStorage.done):[];

    $scope.curindex=0;
    $scope.curCon=$scope.data[$scope.curindex]?$scope.data[$scope.curindex]:[];

    //
    $scope.search="";
    $scope.showSel=true;
    //监测搜索
    $scope.$watch("search",function () {
        var arr=$filter("filter")($scope.data,{title:$scope.search});
        $scope.curindex=0;
        $scope.curCon=arr[$scope.curindex];
        $scope.showSel=true;
    });
    //添加列表
    $scope.addList=function () {
        var obj={};
        obj.id=getId($scope.data);
        obj.title="新建事项"+obj.id;
        obj.son=[];
        $scope.data.push(obj);

        $scope.showSel=true;
        $scope.curindex=getIndex($scope.data,obj.id);
        $scope.curCon=$scope.data[$scope.curindex];

        localStorage.data=JSON.stringify($scope.data);
    };
    $scope.focus=function (id) {
        $scope.curindex=getIndex($scope.data,id);
        $scope.curCon=$scope.data[$scope.curindex];
    };
    $scope.blur=function () {
        localStorage.data=JSON.stringify($scope.data);
    };
    //获取当前下标
    function getIndex(arr,id) {
        for(var i=0;i<arr.length;i++){
            if(arr[i].id==id){
                return i;
            }
        }
    }
    //获取id
    function  getId(arr) {
        var temp=0;
        angular.forEach(arr,function (obj,index) {
            if(obj.id>temp){
                temp=obj.id;
            }
        });
        return temp+1;
    }
    //删除列表
    $scope.delList=function (id) {
        angular.forEach($scope.data,function (obj,index) {
            if(obj.id==id){
                $scope.data.splice(index,1);
                var index=getIndex($scope.data,obj.id);
                $scope.curindex=$scope.data.length-1;
                $scope.curCon=$scope.data[$scope.curindex];
                localStorage.data=JSON.stringify($scope.data);
                if($scope.data.length==0){
                    $scope.showSel=false;
                }

            }
        })
    };
    //添加条目
    $scope.addSon=function () {
        var obj={};
        obj.id=getId($scope.curCon.son);
        obj.title="新建条目"+obj.id;
        $scope.curCon.son.push(obj);
        localStorage.data=JSON.stringify($scope.data);
    };
    //删除条目
    $scope.delTiao=function (id) {
        angular.forEach($scope.curCon.son,function (obj,index) {
            if(obj.id==id){
                $scope.curCon.son.splice(index,1);
                localStorage.data=JSON.stringify($scope.data);
            }
        })
    };
    //添加到已完成
    $scope.doneFun=function (id) {
        angular.forEach($scope.curCon.son,function (obj,index) {
            if(obj.id==id){
                var obj=$scope.curCon.son.splice(index,1);
                obj[0].id=getId($scope.done);
                $scope.done.push(obj[0]);
                localStorage.data=JSON.stringify($scope.data);
                localStorage.done=JSON.stringify($scope.done);
            }
        })
    };
    //删除到已完成
    $scope.delDone=function (id){
        angular.forEach($scope.done,function (obj,index) {
            if(obj.id==id){
                $scope.done.splice(index,1);
                localStorage.done=JSON.stringify($scope.done);
            }
        })
    };
    $scope.showDone=function () {
        $scope.showSel=false;
    };
    $scope.showWait=function () {
        $scope.showSel=true;
    }


}]);