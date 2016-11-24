class SearchCtrl {

  constructor($rootScope, $location,$state,  userService){
    this.foundMembers = [];
    this.userService = userService;
    this.location = $location;
    this.state = $state;
    this.rootScope = $rootScope;
  }

  doSearch(){
    var queryResult = this.userService.searchUser(this.searchInput);
    queryResult.then(
			(result) => {
				this.foundMembers = result.data;
			},
			(error) => {
				console.log("Error while searching users");
			});
  }

  loadProfile(id){
    //this.location.path('/user/'+id+'/'+this.rootScope.app._id);
    this.foundMembers = [];
    this.searchInput = "";
    this.state.go('profile', { 'userId': id, 'appId': this.rootScope.app._id });

  }
}

angular.module('common.search').controller('searchCtrl', SearchCtrl);
