'use strict';

myApp.controller('MainCtrl', function MainCtrl($http,$scope, classInfo) {
    $scope.fromExisting = false;
    $scope.newClass = {
        properties: [{key:'',value:''}]
    };
    $scope.classes = {};
    $scope.showloading = true;

    /**
     * Page Load get all the classes
     */
    classInfo.getAll().then(function(result){
        $scope.showloading = false;
        result = result.data.list;
        for(var i=0;i<result.length;i++){
            $scope.classes[result[i]._id] = result[i];
        }
        console.log($scope.classes)
    },function(error){
        console.log(error)
    });
    
    $scope.delete = function(id){
        classInfo.delete(id).then(function(result){
            result = result.data;
            if(result.hasOwnProperty("error")){
                console.error(result.error);
                return;
            }
            delete $scope.classes[id];
            console.log(result)
        },function(error){
            console.error(error);
        })
        
    };
    
    $scope.initiateNewClass = function(flag){
        $scope.fromExisting = flag;
        $scope.newClass={};
        $scope.newClass.properties = [{key:'',value:''}];  
    };

    $scope.selectParent = function(id){
        $scope.fromExisting = false;
        $scope.newClass.parent_id = id;

    };

    $scope.createClass = function (newClass){
        console.log(newClass.properties);
        var tempProperties = {};
        for(var i=0;i<newClass.properties.length;i++){
            if(newClass.properties[i].key )
                tempProperties[newClass.properties[i].key] = newClass.properties[i].value
        }
        newClass.properties = tempProperties;
        console.log(newClass);
        classInfo.create(newClass).then(function(result){
            result = result.data;
            if(result.hasOwnProperty("error")){
                console.error(result.error);
                return;
            }
            if(!$scope.classes[result.class._id])
                $scope.classes[result.class._id]= result.class;
            console.log(result)
        },function(error){

        })
    };
    
    
    ///////////////////////Sockets Events/////////////////////////////////////
    socketIO.on('my other event', function (data) {
        console.log(data);
    });
    socketIO.on("new_class",function(data){
        if(!$scope.classes[data._id]){
            $scope.classes[data._id] = data;
            $scope.$digest();
        }
    });
    socketIO.on("update_class",function(data){
        $scope.classes[data._id] = data;
        $scope.$digest();
    });
    socketIO.on("delete_class",function(id){
        console.log("delete class event");
        delete $scope.classes[id];
        $scope.$digest();
    });
    //////////////////////////////////////////////////////////////////////////
});