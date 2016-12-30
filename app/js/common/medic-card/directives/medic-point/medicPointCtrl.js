class MedicPointCtrl {
  constructor($scope) {
      this.scope = $scope;
      $scope.medicPoint = this.medicPoint; // needed for watch
      this.hover = 0;

      var me = this;
      $scope.$watch('medicPoint', function() {
        me.setArrowStatus();
      },true);

  }

  setArrowStatus(){
    //UI
    if(this.medicPoint.status[0].selected){
      this.topArrowBg = "../img/medic-top"+ "-" + this.medicPoint.status[0].severe.toLowerCase() +".png";
    }else{
      this.topArrowBg = "../img/medic-top.png";
    }

    if(this.medicPoint.status[1].selected){
      this.leftArrowBg = "../img/medic-left"+ "-" + this.medicPoint.status[1].severe.toLowerCase()+".png";
    }else{
      this.leftArrowBg = "../img/medic-left.png";
    }

    if(this.medicPoint.status[2].selected){
      switch(this.medicPoint.status[2].severe){
        case "Light":
          this.midArrowBg = '#16277e';
          break;
        case "Moderate":
          this.midArrowBg = '#f0fd21';
          break;
        case "Severe":
          this.midArrowBg = '#ff0000';
          break;
      }
    }else{
      this.midArrowBg = "black";
    }

    if(this.medicPoint.status[3].selected){
      this.rightArrowBg = "../img/medic-right"+ "-" + this.medicPoint.status[3].severe.toLowerCase()+".png";
    }else{
      this.rightArrowBg = "../img/medic-right.png";
    }
    if(this.medicPoint.status[4].selected){
      this.bottomArrowBg = "../img/medic-bottom"+ "-" + this.medicPoint.status[4].severe.toLowerCase()+".png";
    }else{
      this.bottomArrowBg = "../img/medic-bottom.png";
    }

  }

  isSet(anatomicName){
    for(var status of this.medicPoint.status){
      if(status.anatomicName == anatomicName && status.selected)return true;
    }
    return false;
  }

  openCorrectPopup(anatomicName){
    if(!this.isSet(anatomicName)){
      var object = {'point': this.medicPoint, 'arrow': anatomicName}
      this.scope.$emit('newMedicPointSelected', object);
    }

  }

  topArrowClicked(){
    this.openCorrectPopup('Craniaal');
  }
  bottomArrowClicked(){
    this.openCorrectPopup('Caudaal')
  }
  leftArrowClicked(){
    this.openCorrectPopup('Lateraal');
  }
  rightArrowClicked(){
    this.openCorrectPopup('Mediaal');
  }
  midArrowClicked(){
    this.openCorrectPopup('Centraal')
  }
}

angular.module('common.medic-point').controller('medicPointCtrl', MedicPointCtrl);
