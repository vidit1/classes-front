myApp.service('classInfo',function($http){

    this.getAll = function (){
        return $http.get(HOST_NAME + "get_all")
    };
    
    this.delete = function(id){
        let body = {
            method: "post",
            url: HOST_NAME + "delete",
            data: {
                _id : id
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: function (data) {
                return $.param(data);
            }
        };
        return $http(body);
    };
    
    this.create = function(classInfo){
        let body = {
            method: "post",
            url: HOST_NAME + "create",
            data: classInfo,
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
            transformRequest: function (data) {
                return $.param(data);
            }
        };
        return $http(body);
    }
});
