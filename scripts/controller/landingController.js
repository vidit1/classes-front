'use strict';

myApp.controller('MainCtrl', function MainCtrl($http,$scope, classInfo) {
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
    
    $scope.constructNewClass = function(flag){
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
            if(newClass.properties[i].key.toString() )
                tempProperties[newClass.properties[i].key.toString()] = newClass.properties[i].value
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

    $scope.createEditStructure = function (id){
        $scope.editClass = {
            name : $scope.classes[id].name,
            _id : $scope.classes[id]._id,
            properties : []
        };
        
        for(var key in $scope.classes[id].properties){
            if(!$scope.classes[id].properties.hasOwnProperty(key))
                continue;
            var temp = {
                key : key,
                value : $scope.classes[id].properties[key],
                _id : $scope.classes[id]._id,
                delete : false
            };
            $scope.editClass.properties.push(temp);
        }
    };

    $scope.updateClass = function () {
        var properties = {};
        for (var i = 0; i < $scope.editClass.properties.length; i++) {
            if ($scope.editClass.properties[i].key.toString())
                properties[$scope.editClass.properties[i].key.toString()] = $scope.editClass.properties[i].value
        }

        classInfo.update(properties,$scope.editClass._id).then(function(result){
            result = result.data;
            if(result.hasOwnProperty("error")){
                console.error(result.error);
                return;
            }
            console.log(result)
        },function(error){
            console.error(error);
        })
    };

    $scope.viewClass = function(id){
        $scope.viewOnly = {
            name : $scope.classes[id].name
        };
        $scope.viewOnly.properties = createLink(id);
        $scope.viewOnly.propertyChain = [];
        createPropertyChain(id,$scope.viewOnly.propertyChain);

        console.log($scope.viewOnly.propertyChain);
    };

    function createPropertyChain(id, array){
        var  temp = {
            id : id,
            name : $scope.classes[id].name,
            properties : $scope.classes[id].properties
        };
        if(array.length){
            temp.name = "Parent("+array[array.length-1].name+") = " + temp.name;
        }
        array.push(temp);
        console.log(temp);
        if($scope.classes[id].parent_id){
            createPropertyChain($scope.classes[id].parent_id, array)
        }
    }

    function createLink(id){
        let temp = {};
        if($scope.classes[id].parent_id){
            temp = createLink($scope.classes[id].parent_id)
        } else {
            return $scope.classes[id].properties
        }
        let prototype = Object.create(temp);
        for(var key in $scope.classes[id].properties){
            if($scope.classes[id].properties.hasOwnProperty(key)) {
                prototype[key.toString()] = $scope.classes[id].properties[key]
            }
        }
        return prototype;
    }

    ///////////////////////Sockets Events/////////////////////////////////////
    socketIO.on("new_class",function(data){
        console.log("New class event");
        if(!$scope.classes[data._id]){
            $scope.classes[data._id] = data;
            console.log($scope.classes[data._id]);
            $scope.$digest();
        }
    });
    socketIO.on("update_class",function(data){
        console.log("update class event",data);
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