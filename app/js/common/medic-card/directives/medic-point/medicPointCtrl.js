class MedicPointCtrl {
  constructor($scope, medicalService) {
      this.scope = $scope;
      this.hover = 0;
      this.medicalService = medicalService;

      var me = this;
      $scope.$watch('vm.medicPoint', function() {
        me.setArrowStatus();
      },true);
  }

  setArrowStatus(){
    //UI
    if(this.medicPoint.status[0].selected){
      this.topArrowBg = "../img/medic-top"+ "-" + this.medicPoint.status[0].injury.severity.toLowerCase() +".png";
    }else{
      this.topArrowBg = "../img/medic-top.png";
    }

    if(this.medicPoint.status[1].selected){
      this.leftArrowBg = "../img/medic-left"+ "-" + this.medicPoint.status[1].injury.severity.toLowerCase()+".png";
    }else{
      this.leftArrowBg = "../img/medic-left.png";
    }

    if(this.medicPoint.status[2].selected){
      this.midArrowBg = this.medicalService.getColorForSeverity(this.medicPoint.status[2].injury.severity);
    }else{
      this.midArrowBg = "black";
    }

    if(this.medicPoint.status[3].selected){
      this.rightArrowBg = "../img/medic-right"+ "-" + this.medicPoint.status[3].injury.severity.toLowerCase()+".png";
    }else{
      this.rightArrowBg = "../img/medic-right.png";
    }
    if(this.medicPoint.status[4].selected){
      this.bottomArrowBg = "../img/medic-bottom"+ "-" + this.medicPoint.status[4].injury.severity.toLowerCase()+".png";
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
    }else{
      var object = {'point': this.medicPoint, 'arrow': anatomicName}
      this.scope.$emit('showMedicPointInfo', object);
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
