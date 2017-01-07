class MedicCardCtrl {

  constructor($scope, medicalService) {
    this.scope = $scope;
    // UI settings
      this.openInput = false;
      this.openInfo = false;
      this.info = {
        'left': 0,
        'top': 0,
        'color': "#FFFFFF"
      }
    //-----------
    this.medicalService = medicalService;
    this.medicPoints = []; // medicPoints is an included js-file in index.html
    this.lastClickedPoint = {};
    //user is the selected user atm
    this.selectedUserId = $scope.$root.user._id;

    //arrays to model the info input possibilities
    //$scope.disease = {'tissue': "Muscle", 'pathology': "OverallPain", 'severity': "Moderate"};
    this.infoTissues = [];
    this.infoPathologies = [];
    this.infoseverities = [];

    // catches the event thrown by one of the medicPoints
    var me = this;
    $scope.$on('newMedicPointSelected', function(event, data){
      me.popupTitle = data.point.code + " " + data.arrow;
      me.lastClickedPoint = data;
      (me.openInfo)?me.openInfo=false:me.openInput = true;
    });

    $scope.$on('showMedicPointInfo', function(event,data){
      me.lastClickedPoint = data;
      let statusIndex = me.getStatusIndexFromAtomicName(data.arrow);
      //TODO
      me.openInfo =true;
      let injury =data.point.status[statusIndex].injury;
      me.info.fullInjury = injury;

      me.info.title = injury.code.replace("-", " ") + " " + injury.severity;
      me.info.injury = injury.tissue + " " + injury.pathology;

      me.info.comment = injury.comment;
      me.info.since = new Date(injury.date);

      me.info.top = data.point.position[0] - 20;
      me.info.left = data.point.position[1] + 50;

      me.info.color = me.medicalService.getColorForSeverity(injury.severity);
    });

    this.medicalService.getInjuries(this.selectedUserId).then((data)=>
      {
        this.medicPoints = this.resetMedicPoints();
        for(let injury of data){
          this.updateMedicPoint(injury);
        }

      }
    );

  }
  saveMedic(disease){
    var code = this.lastClickedPoint.point.code + "-" +this.lastClickedPoint.arrow;
    let injury = this.convertDiseaseToInjury(disease,code);
    if(injury._id != undefined) {
      this.medicalService.updateInjury(injury).then(
        (result) => {
          if(result.status == 200){
            this.updateMedicPoint(result.data);
            this.scope.disease ={};
            this.cancel();
          }
        });
    }else{
      this.medicalService.addInjury(injury).then((data)=> {
        this.updateMedicPoint(data);
        this.scope.disease ={};
        this.cancel();
      });
    }

  }
  convertDiseaseToInjury(disease, code){
    var injury = {};
    if(disease.id != undefined) injury._id = disease.id;
    injury.code = code;
    injury.tissue = disease.tissue;
    injury.pathology = disease.pathology;
    injury.severity = disease.severity;
    (disease.comment!=undefined)?   injury.comment =  disease.comment :  injury.comment =  "";
    injury.date = disease.date;
    injury.user = this.selectedUserId;
    return injury;
  }
  convertInjuryToDisease(injury){
    var disease = {};
    disease.tissue = injury.tissue;
    disease.pathology = injury.pathology;
    disease.severity = injury.severity;
    disease.comment = injury.comment;
    disease.date = new Date(injury.date);
    disease.id = injury._id;
    return disease;
  }
  cancel(){this.openInput = false;this.scope.disease ={};}
  getStatusIndexFromAtomicName(atomicName){
    switch(atomicName){
      case "Craniaal":
        return 0;
      case "Lateraal":
        return 1;
      case "Centraal":
        return 2;
      case "Mediaal":
        return 3
      case "Caudaal":
        return 4;
      }
      return;
  }
  updateMedicPoint(injury, deleted = false){
    // reference code is the 'code' value in the medic Point
    var refCode = injury.code.split("-")[0];
    var refArrow = injury.code.split("-")[1];
    for(point of this.medicPoints){
      if(refCode == point.code){
        let statusIndex = this.getStatusIndexFromAtomicName(refArrow);
        point.status[statusIndex].selected = !deleted;
        point.status[statusIndex].injury = injury;
      }
    }
  }
  edit(injury){
    this.scope.disease = this.convertInjuryToDisease(injury);
    this.openInput = true;
  }
  delete(injury){
    this.medicalService.deleteInjury(injury).then(
      (result)=>{
        if(result.status == 200)
         this.updateMedicPoint(injury, true);
      }
    )
  }
  resetMedicPoints(){
    return JSON.parse(JSON.stringify(medicPoints));
  }
}

angular.module('common.medic-card').controller('medicCardCtrl', MedicCardCtrl);
